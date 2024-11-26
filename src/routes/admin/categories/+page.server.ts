export const load = async ({ locals }) => {
	const { db } = locals;

	const categories = await db.query.categoryTable.findMany();
	return {
		categories
	};
};
