import { createAuth } from '$lib/auth.js';
import { cartItemTable, cartTable } from '$lib/server/db/schema.js';
import { error, fail } from '@sveltejs/kit';
import { sql } from 'drizzle-orm';

export const load = async ({ locals: { db }, params }) => {
	const { slug } = params;
	const product = await db.query.productTable.findFirst({
		where: (product, { eq }) => eq(product.slug, slug),

	});
	if (!product) {
		error(404);
	}
	return {
		product
	};
};

export const actions = {
	addToOrder: async ({ locals: { db }, request, params }) => {
		const { slug } = params;

		const auth = createAuth(db);
		const form = await request.formData();
		const quantity = form.get('quantity') as unknown as number;
		const session = await auth.api.getSession({
			headers: request.headers
		});
		if (!session) {
			return fail(401, {
				message: 'You need to log in first'
			});
		}

		const userId = session.user.id;
		const product = await db.query.productTable.findFirst({
			where: (product, { eq }) => eq(product.slug, slug),
			columns: {
				id: true,
				price: true,
				name: true,
				stock: true
			}
		});

		if (!product) {
			throw error(404, 'Product not found');
		}

		// First, check if user has an existing cart
		let cart = await db.query.cartTable.findFirst({
			where: (cart, { eq }) => eq(cart.userId, userId)
		});

		// If no cart exists, create one
		if (!cart) {
			cart = await db
				.insert(cartTable)
				.values({
					userId
				})
				.returning()
				.get();
		}

		// Check if the product is already in the user's cart
		const existingCartItem = await db.query.cartItemTable.findFirst({
			where: (cartItem, { eq, and }) =>
				and(eq(cartItem.cartId, cart.id), eq(cartItem.productId, product.id)),
			columns: {
				quantity: true
			}
		});

		const alreadyInCart = existingCartItem?.quantity || 0;
		const availableStock = product.stock - alreadyInCart;
		const quantityToAdd = Math.min(quantity, availableStock);
		

		if (quantityToAdd === 0) {
			return fail(400, {
				message: `Sorry ${product.name} isn't available.`
			});
		}

		await db
			.insert(cartItemTable)
			.values({
				cartId: cart.id,
				productId: product.id,
				priceAtTimeOfAddition: product.price,
				quantity: quantityToAdd
			})
			.onConflictDoUpdate({
				target: [cartItemTable.cartId, cartItemTable.productId],
				set: {
					quantity: sql`${cartItemTable.quantity} + ${quantityToAdd}`,
					priceAtTimeOfAddition: product.price
				}
			});

		const message =
			quantityToAdd < quantity
				? `Only ${quantityToAdd} of ${product.name} could be added to your cart due to stock limitations.`
				: `${quantityToAdd} ${product.name} added to cart.`;

		return {
			message
		};
	}
};
