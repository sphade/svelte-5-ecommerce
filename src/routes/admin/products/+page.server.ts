import { productTable } from '$lib/server/db/schema.js';
import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const load = async ({ locals: { db }, url }) => {
	const term = url.searchParams.get('term') || '';
	const products = await db.query.productTable.findMany({
		with: {
			category: true
		},
		orderBy: (product, { desc }) => desc(product.createdAt),
		where: (t, { like, or }) => or(like(t.name, `%${term}%`), like(t.description, `%${term}%`))
	});

	return {
		products
	};
};

export const actions = {
	deleteProduct: async ({ locals: { db, bucket }, request }) => {
		const data = await request.formData();

		const id = data.get('id') as unknown as number;
		try {
			// Your deletion logic here
			const res = await db.delete(productTable).where(eq(productTable.id, id)).returning().get();
			if (!res) {
				return fail(400, {
					message: 'Failed to delete product. Please try again.'
				});
			}
			const keys = res.images.map((image) => {
				return image.key;
			});
			await bucket.delete(keys);
			// Return a success message
			return {
				message: 'Product successfully deleted!'
			};
		} catch {
			// Return an error message
			return fail(400, {
				message: 'Failed to delete product. Please try again.'
			});
		}
	}
};
