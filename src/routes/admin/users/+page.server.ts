import { getUsers } from '$lib/server/queries';

export const load = async ({ locals: { db } }) => {
	const users = await getUsers(db);
	return {
		users
	};
};
