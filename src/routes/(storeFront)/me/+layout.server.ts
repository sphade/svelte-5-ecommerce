import { createAuth } from '$lib/auth.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, request }) => {
	const { db } = locals;
	const auth = createAuth(db);
	const session = await auth.api.getSession({
		headers: request.headers
	});
	if (!session) redirect(303, '/');
};
