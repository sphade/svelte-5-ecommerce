import type { DrizzleD1Database } from 'drizzle-orm/d1';
import * as schema from './db/schema';

export async function getProducts({
	db,
	term,
	categoryId,
	subCategories
}: {
	db: DrizzleD1Database<typeof schema>;
	term: string;
	categoryId?: number;
	subCategories?: string[];
}) {
	const products = await db.query.productTable.findMany({
		with: {
			category: true
		},
		orderBy: (product, { desc }) => desc(product.createdAt),
		where: (t, { like, or, and, eq, inArray }) =>
			and(
				or(like(t.name, `%${term}%`), like(t.description, `%${term}%`)),
				categoryId ? eq(t.categoryId, categoryId) : undefined,
				subCategories && subCategories.length > 0
					? inArray(t.subCategory, subCategories)
					: undefined
			)
	});
	const categories = Array.from(
		new Map(products.map((item) => [item.category.id, item.category])).values()
	);
	return { products, categories };
}

export async function getUsers(db: DrizzleD1Database<typeof schema>) {
	const users = await db.query.user.findMany({
		orderBy: (t, { desc }) => desc(t.createdAt)
	});
	return users;
}
