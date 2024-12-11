import { getProducts } from '$lib/server/queries.js';

export const load = async ({ locals: { db }, url, platform }) => {
    const kv = platform?.env.kv;
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

    // Generate a unique cache key based on the search parameters
    const cacheKey = `lawal`;

    // Try to get the cached data
    const cachedData = await kv.get(cacheKey);
    if (cachedData) {
        console.log("🚀 ~ load ~ cachedData:", cachedData)
        // Return the cached data in the expected format
        return JSON.parse(cachedData);
    }

    // If not cached, fetch the data and cache it
    const { products, categories } = await getProducts({
        term,
        db,
        categoryId,
        subCategories: validSubCategories
    });

    // Cache the result
    await kv.put(cacheKey, JSON.stringify({ products, categories }), { expirationTtl: 3600 }); // Cache for 1 hour

    // Return the fetched data
    return {
        products,
        categories
    };
};