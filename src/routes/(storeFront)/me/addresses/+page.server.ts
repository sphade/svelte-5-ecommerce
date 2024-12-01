import { createAuth } from '$lib/auth.js';
import { addressSchema } from '$lib/formSchema.js';
import { addressTable } from '$lib/server/db/schema.js';
import { fail, redirect } from '@sveltejs/kit';
import { and, or } from 'drizzle-orm';
import { eq } from 'drizzle-orm';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async () => {};

export const actions = {
	addAddress: async ({ locals: { db }, request }) => {
		const form = await superValidate(request, zod(addressSchema));
		const auth = createAuth(db);
		const session = await auth.api.getSession({
			headers: request.headers
		});
		if (!session) {
			redirect(308, '/');
		}

		if (!form.valid) {
			return fail(400, { form });
		}
		const { address, country, isDefaultBilling, isDefaultShipping, name, state } = form.data;
		// First, clear existing default flags if new address is set as default
		// Batch the operations

		// Clear existing default flags if new address is set as default
		if (isDefaultBilling || isDefaultShipping) {
			await db
				.update(addressTable)
				.set({
					...(isDefaultBilling ? { isDefaultBilling: false } : {}),
					...(isDefaultShipping ? { isDefaultShipping: false } : {})
				})
				.where(
					and(
						eq(addressTable.userId, session.user.id),
						or(
							isDefaultBilling ? eq(addressTable.isDefaultBilling, true) : undefined,
							isDefaultShipping ? eq(addressTable.isDefaultShipping, true) : undefined
						)
					)
				);
		}

		const res = await db
			.insert(addressTable)
			.values({
				address,
				country,
				isDefaultBilling,
				isDefaultShipping,
				label: name,
				state,
				userId: session.user.id
			})
			.returning({ label: addressTable.label })
			.get();
		return message(form, { text: `created ${res.label} address`, type: 'success' });
	},
	deleteAddress: async ({ locals: { db }, request }) => {
		const data = await request.formData();

		const id = data.get('id') as unknown as number;
		const auth = createAuth(db);
		const session = await auth.api.getSession({
			headers: request.headers
		});
		if (!session) {
			redirect(308, '/');
		}

		const res = await db
			.delete(addressTable)
			.where(eq(addressTable.id, id))
			.returning({ label: addressTable.label })
			.get();
		return {
			message: `${res?.label} address successfully deleted!`
		};
	}
};
