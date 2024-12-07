import { createAuth } from '$lib/auth.js';
import { categoryTable, productTable } from '$lib/server/db/schema.js';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const load = async ({ locals }) => {
	const { db } = locals;

	const categories = await db.query.categoryTable.findMany();
	return {
		categories
	};
};

export const actions = {
	deleteCategory: async ({ request, locals }) => {
		const { db } = locals;
		const auth = createAuth(db);
		const formData = await request.formData();
		const id = Number(formData.get('id'));
		const session = await auth.api.getSession({ headers: request.headers });
		if (session?.user.role !== 'admin') {
			return fail(401, { message: 'Unauthorized' });
		}

		if (!id) {
			return fail(400, { message: 'Invalid id' });
		}

	await db.delete(categoryTable).where(eq(categoryTable.id, id))
	return {
		message: 'deleted category with all the related products'
	};
		
	}
};
