import { dev } from '$app/environment';
import { createAuth } from '$lib/auth.js';
import { productSchema } from '$lib/formSchema.js';
import { productTable } from '$lib/server/db/schema.js';
import { redirect } from '@sveltejs/kit';
import { nanoid } from 'nanoid';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

const uploadFiles = async (files: File[], bucket: R2Bucket) => {
	const baseTimestamp = Date.now();
	const uploadPromises = files.map(async (file, index) => {
		try {
			const key = `${baseTimestamp + index}${file.name.replaceAll(' ', '')}`;
			await bucket.put(key, file);
			const fileUrl = dev
				? `/api/r2/${key}` // Local development proxy URL
				: `https://pub-50009b19f23248c1ae243779c481d0f5.r2.dev/${key}`; // Production public URL
			return fileUrl;
		} catch (error) {
			console.error(`Failed to upload ${file.name}:`, error);
			throw Error('Failed to upload file');
		}
	});
	return Promise.all(uploadPromises);
};
export const load = async ({ locals }) => {
	const { db } = locals;
	const categories = await db.query.categoryTable.findMany();

	const form = await superValidate(zod(productSchema));
	return { form, categories };
};

export const actions = {
	default: async ({ locals, request }) => {
		const { db, bucket } = locals;
		const auth = createAuth(db);
		const session = await auth.api.getSession({
			headers: request.headers
		});
		if (session === null || session?.user.role !== 'admin') {
			redirect(308, '/');
		}
		const form = await superValidate(request, zod(productSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		const { category, description, images, name, price, stock, subCategory } = form.data;
		// Upload files
		const uploadResults = await uploadFiles(images, bucket);

		const slug = name.toLowerCase().replaceAll(' ', '-') + nanoid(5);
		await db.insert(productTable).values({
			categoryId: category,
			description,
			images: uploadResults,
			name,
			price,
			stock,
			subCategory,
			slug,
			adminId: session?.user.id || ''
		});
		redirect(303, '/admin/products');
	}
};
