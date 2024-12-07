import { getCategories, getCategoriesWithProducts, getProducts } from '$lib/server/queries.js';

export const load = async ({ locals: { db }, url }) => {
	const term = url.searchParams.get('term') || '';
	const categoryId = url.searchParams.get('categoryId') as unknown as number;
	let subCategories = JSON.parse(url.searchParams.get('subCategories') as string) as
		| string[]
		| undefined;
	console.log('🚀 ~ load first one', subCategories);
	if (subCategories && subCategories[0] === '') subCategories = undefined; // JSON.parse(stringArray).filter(Boolean);
	console.log('🚀 ~ load ~ second one:', subCategories);
	const { products, categories } = await getProducts({
		term,
		db,
		categoryId,
		subCategories
	});
	const categoriesWithProducts = await getCategoriesWithProducts(db);
	return {
		products,
		categories,
		categoriesWithProducts,
		subCategories
	};
};
