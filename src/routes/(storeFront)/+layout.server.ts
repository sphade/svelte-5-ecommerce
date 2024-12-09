import { createAuth } from '$lib/auth.js';

export const load = async ({ request, locals }) => {
	const { db } = locals;
	const auth = createAuth(db);
	const session = await auth.api.getSession({
		headers: request.headers
	});
	const id = session?.user.id || '';
	const user = await db.query.user.findFirst({
		where: (user, { eq }) => eq(user.id, id),
		with: {
			addresses: true,
			cart: {
				with: {
					cartItems: {
						with: {
							product: true
						}
					}
				}
			},
			orders: {
				with: {
					orderProducts: {
						with: {
							product: true
						}
					}
				},
				orderBy: (t, { desc }) => desc(t.createdAt)
			}
		}
	});
	return {
		user
	};
};
