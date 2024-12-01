import { getProducts } from '$lib/server/queries.js';

export const load = async ({ locals: { db }, url }) => {
	const term = url.searchParams.get('term') || '';
	const products = await getProducts({ term, db });
	console.log('🚀 ~ load ~ products:', products);
	return {
		products
	};
};
