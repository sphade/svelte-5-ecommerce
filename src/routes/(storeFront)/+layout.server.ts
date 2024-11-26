import { createAuth } from '$lib/auth.js';

export const load = async ({ request, locals }) => {
	const { db } = locals;
	const auth = createAuth(db);
	const session = await auth.api.getSession({
		headers: request.headers
	});
	const id = session?.user.id || '';
	const user = await db.query.user.findFirst({
		where: (user, { eq }) => eq(user.id, id)
	});
	return {
		user
	};
};
