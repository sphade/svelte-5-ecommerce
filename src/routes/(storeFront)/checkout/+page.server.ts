import { createAuth } from '$lib/auth.js';
import { cartTable, orderProductTable, orderTable } from '$lib/server/db/schema.js';
import { redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const load = async ({ locals: { db } }) => {};

export const actions = {
	proceedToPayment: async ({ locals: { db }, url, request }) => {
		const auth = createAuth(db);
		const session = await auth.api.getSession({
			headers: request.headers
		});
		const userId = session?.user.id;
		if (!userId) {
			redirect(303, '/');
		}
		const cartId = url.searchParams.get('cartId') as unknown as number;
		const cartItems = await db.query.cartItemTable.findMany({
			where: (cartItemTable, { eq }) => eq(cartItemTable.cartId, cartId),
			with: {
				product: true
			}
		});
		const totalAmount = cartItems.reduce(
			(total, item) => total + item.quantity * item.priceAtTimeOfAddition,
			0
		);
	}
};
