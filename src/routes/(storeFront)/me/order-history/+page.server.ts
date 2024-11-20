import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
	await parent();
	return {};
}) satisfies PageServerLoad;
