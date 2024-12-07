import { createAuth } from '$lib/auth.js';
import { cartItemTable } from '$lib/server/db/schema.js';
import { fail } from '@sveltejs/kit';
import { and, eq, sql } from 'drizzle-orm';

export const actions = {
	deleteFromCart: async ({ request, locals: { db }, url }) => {
		const auth = createAuth(db);
		const cartId = url.searchParams.get('cartId') as unknown as number;
		const productId = url.searchParams.get('productId') as unknown as number;

		const session = await auth.api.getSession({
			headers: request.headers
		});
		if (!session) {
			return fail(401, {
				message: 'You need to log in first'
			});
		}
		try {
			await db
				.delete(cartItemTable)
				.where(and(eq(cartItemTable.cartId, cartId), eq(cartItemTable.productId, productId)))
				.returning()
				.get();
			return {
				message: `deleted successfully`
			};
		} catch (error) {
			console.log('🚀 ~ deleteFromCart: ~ error:', error);
		}
	},
	incrementInCart: async ({ locals: { db }, request, url }) => {
		const cartId = url.searchParams.get('cartId') as unknown as number;
		const productId = url.searchParams.get('productId') as unknown as number;
		const stock = url.searchParams.get('stock') as unknown as number;

		const auth = createAuth(db);
		const session = await auth.api.getSession({
			headers: request.headers
		});
		if (!session) {
			return fail(400, {
				message: 'You need to log in first'
			});
		}
		const existingCartItem = await db.query.cartItemTable.findFirst({
			where: (cartItem, { eq, and }) =>
				and(eq(cartItem.cartId, cartId), eq(cartItem.productId, productId)),
			columns: {
				quantity: true
			}
		});
		const alreadyInCart = existingCartItem?.quantity || 0;
		const availableStock = stock - alreadyInCart;
		if (availableStock < 1) {
			return fail(400, {
				message: 'could not be added to your cart due to stock limitations.'
			});
		}

		await db
			.update(cartItemTable)
			.set({
				quantity: sql`${cartItemTable.quantity} + 1`
			})
			.where(and(eq(cartItemTable.cartId, cartId), eq(cartItemTable.productId, productId)));

		return {
			message: `incremented successfully`
		};
	},
	decrementInCart: async ({ locals: { db }, request, url }) => {
		const cartId = url.searchParams.get('cartId') as unknown as number;
		const productId = url.searchParams.get('productId') as unknown as number;
		const stock = url.searchParams.get('stock') as unknown as number;

		const auth = createAuth(db);
		const session = await auth.api.getSession({
			headers: request.headers
		});
		if (!session) {
			return fail(400, {
				message: 'You need to log in first'
			});
		}
		const existingCartItem = await db.query.cartItemTable.findFirst({
			where: (cartItem, { eq, and }) =>
				and(eq(cartItem.cartId, cartId), eq(cartItem.productId, productId)),
			columns: {
				quantity: true
			}
		});
		const lastItem = existingCartItem?.quantity === 1;
		if (lastItem) {
			await db
				.delete(cartItemTable)
				.where(and(eq(cartItemTable.cartId, cartId), eq(cartItemTable.productId, productId)));
			return {
				message: `deleted successfully`
			};
		}

		await db
			.update(cartItemTable)
			.set({
				quantity: sql`${cartItemTable.quantity} - 1`
			})
			.where(and(eq(cartItemTable.cartId, cartId), eq(cartItemTable.productId, productId)));

		return {
			message: `decremented successfully`
		};
	}
};
