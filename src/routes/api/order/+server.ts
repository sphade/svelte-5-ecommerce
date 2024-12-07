import { createAuth } from '$lib/auth.js';
import { SHIPPING_FEE } from '$lib/constant.js';
import { cartTable, orderProductTable, orderTable } from '$lib/server/db/schema';
import { error, text } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const POST = async ({ request, locals: { db } }) => {
	const { cartId }: { cartId: number } = await request.json();
	const auth = createAuth(db);
	const session = await auth.api.getSession({
		headers: request.headers
	});
	const userId = session?.user.id;
	if (!userId) error(401, 'unauthorized request');
	const cartItems = await db.query.cartItemTable.findMany({
		where: (cartItemTable, { eq }) => eq(cartItemTable.cartId, cartId),
		with: {
			product: true
		}
	});
	const totalAmount = cartItems.reduce(
		(total, item) => total + item.quantity * item.product.price,
		0
	) + SHIPPING_FEE
	const userShippingAddress = await db.query.addressTable.findFirst({
		where: (t, { eq, and }) => and(eq(t.userId, userId), eq(t.isDefaultShipping, true))
	});
	const shippingAddressId = userShippingAddress?.id;
	if (!shippingAddressId) error(404, 'User shipping address not found');
	const newOrder = await db
		.insert(orderTable)
		.values({
			userId: userId,
			status: 'processing',
			amount: totalAmount,
			addressId: userShippingAddress.id
		})
		.returning()
		.get();
	const orderProducts = cartItems.map((item) => ({
		orderId: newOrder.id,
		productId: item.productId,
		quantity: item.quantity
	}));
	await db.batch([
		db.insert(orderProductTable).values(orderProducts),
		db.delete(cartTable).where(eq(cartTable.id, cartId))
	]);
	return text(newOrder.code);
};
