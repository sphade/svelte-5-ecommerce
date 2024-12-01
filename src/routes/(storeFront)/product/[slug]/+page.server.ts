import { createAuth } from '$lib/auth.js';
import { cartItemTable, cartTable } from '$lib/server/db/schema.js';
import { error, fail, redirect } from '@sveltejs/kit';
import { sql } from 'drizzle-orm';

export const load = async ({ locals: { db }, params }) => {
	const { slug } = params;
	const product = await db.query.productTable.findFirst({
		where: (product, { eq }) => eq(product.slug, slug)
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
			return fail(400, {
				message: 'you need to  login first'
			});
		}
		const userId = session.user.id;
		const product = await db.query.productTable.findFirst({
			where: (product, { eq }) => eq(product.slug, slug),
			columns: {
				id: true,
				price: true,
				name: true
			}
		});
		if (!product) {
			error(404);
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
		await db
			.insert(cartItemTable)
			.values({
				cartId: cart.id,
				productId: product.id,
				priceAtTimeOfAddition: product.price,
				quantity
			})
			.onConflictDoUpdate({
				target: [cartItemTable.cartId, cartItemTable.productId],
				set: {
					quantity: sql`${cartItemTable.quantity} + ${quantity}`,
					priceAtTimeOfAddition: product.price
				}
			});
		return {
			message: `${quantity} ${product.name} added to cart `
		};
	}
};
