import { getProducts } from '$lib/server/queries.js';

export const load = async ({ locals: { db }, url }) => {
	const term = url.searchParams.get('term') || '';
	const categoryId = url.searchParams.get('categoryId') as unknown as number;
	const subCategoriesParam = url.searchParams.get('subCategories');
	let subCategories: string[] = [];

	if (subCategoriesParam) {
		try {
			subCategories = JSON.parse(subCategoriesParam) as string[];
		} catch (error) {
			console.error('Failed to parse subCategories:', error);
		}
	}

	const validSubCategories = subCategories.filter((subCategory) => subCategory.trim() !== '');
	const { products, categories } = await getProducts({
		term,
		db,
		categoryId,
		subCategories: validSubCategories
	});
	return {
		products,
		categories
	};
};
