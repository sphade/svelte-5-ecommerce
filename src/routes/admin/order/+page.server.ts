import { STATUS } from '$lib/constant.js';
import { orderTable } from '$lib/server/db/schema.js';
import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const load = async ({ locals: { db }, url }) => {
	const code = url.searchParams.get('code') || '';
	const orders = await db.query.orderTable.findMany({
		with: {
			orderProducts: {
				with: {
					product: true
				}
			},
			user: {
				columns: {
					name: true
				}
			}
		},
		where: (orderTable, { like }) => like(orderTable.code, `%${code}%`),
		orderBy: (t, { desc }) => desc(t.createdAt)
	});
	return {
		orders
	};
};

export const actions = {
	updateOrder: async ({ request, locals: { db } }) => {
		const data = await request.formData();
		const id = data.get('id') as unknown as number;
		console.log('🚀 ~ updateOrder: ~ id:', id);

		if (!id) {
			return fail(400, { message: 'Invalid order ID' });
		}

		const order = await db.query.orderTable.findFirst({
			where: eq(orderTable.id, id)
		});

		if (!order) {
			return fail(404, { message: 'Order not found' });
		}

		let nextStatus: (typeof STATUS)[number];

		switch (order.status) {
			case 'processing':
				nextStatus = 'shipped';
				break;
			case 'shipped':
				nextStatus = 'delivered';
				break;
			default:
				return fail(400, { message: 'Invalid status transition' });
		}

		try {
			await db.update(orderTable).set({ status: nextStatus }).where(eq(orderTable.id, id));

			return {
				message: `Order status updated to ${nextStatus}`
			};
		} catch {
			return fail(500, {
				message: 'Failed to update order status'
			});
		}
	}
};
