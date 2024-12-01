import type { DrizzleD1Database } from 'drizzle-orm/d1';
import * as schema from './db/schema';

export async function getProducts({
	db,
	term
}: {
	db: DrizzleD1Database<typeof schema>;
	term: string;
}) {
	const products = await db.query.productTable.findMany({
		with: {
			category: {
				columns: {
					name: true
				}
			}
		},
		orderBy: (product, { desc }) => desc(product.createdAt),
		where: (t, { like, or }) => or(like(t.name, `%${term}%`), like(t.description, `%${term}%`))
	});
	return products;
}

export async function getUsers(db: DrizzleD1Database<typeof schema>) {
	const users = await db.query.user.findMany({
		orderBy: (t, { desc }) => desc(t.createdAt)
	});
	return users;
}
