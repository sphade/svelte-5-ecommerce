import { createAuth } from '$lib/auth.js';
import { categorySchema } from '$lib/formSchema';
import { categoryTable } from '$lib/server/db/schema.js';
import { redirect } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async () => {
	const form = await superValidate(zod(categorySchema));
	return {
		form
	};
};

export const actions = {
	default: async ({ request, locals }) => {
		const { db } = locals;
		const auth = createAuth(db);
		const session = await auth.api.getSession({
			headers: request.headers
		});
		console.log('🚀 ~ default: ~ session:', session);
		// if (session?.user.role !== 'admin') {
		// 	error(401, 'sorry you are not authorized to perform this operation');
		// }
		const form = await superValidate(request, zod(categorySchema));
		console.log('🚀 ~ default: ~ form:', form);
		if (!form.valid) {
			return fail(400, { form });
		}
		const { description, subCategories, name } = form.data;
		await db.insert(categoryTable).values({
			description,
			subCategories,
			name
		});
		redirect(303, '/admin/categories');
	}
};
