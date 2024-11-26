import { ROLE, STATUS } from '../../constant';
import { relations, sql } from 'drizzle-orm';
import { sqliteTable, text, integer, primaryKey, check } from 'drizzle-orm/sqlite-core';
// ;
export const timestamps = {
	updatedAt: integer('updated_at', {
		mode: 'timestamp'
	})
		.notNull()
		.$onUpdate(() => sql`CURRENT_TIMESTAMP`),
	createdAt: integer('created_at', {
		mode: 'timestamp'
	})
		.notNull()
		.default(sql`(cast(strftime('%s', 'now') as int))`)
};
export function array<T>(name: string) {
	return text(name, { mode: 'json' }).$type<T[]>();
}

export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: integer('emailVerified', {
		mode: 'boolean'
	}).notNull(),
	image: text('image'),
	createdAt: integer('createdAt', {
		mode: 'timestamp'
	}).notNull(),
	updatedAt: integer('updatedAt', {
		mode: 'timestamp'
	}).notNull(),
	role: text('role', { enum: ROLE }).default('user'),
	banned: integer('banned', {
		mode: 'boolean'
	}),
	banReason: text('banReason'),
	banExpires: integer('banExpires', {
		mode: 'timestamp'
	})
});

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	expiresAt: integer('expiresAt', {
		mode: 'timestamp'
	}).notNull(),
	token: text('token').notNull().unique(),
	createdAt: integer('createdAt', {
		mode: 'timestamp'
	}).notNull(),
	updatedAt: integer('updatedAt', {
		mode: 'timestamp'
	}).notNull(),
	ipAddress: text('ipAddress'),
	userAgent: text('userAgent'),
	userId: text('userId')
		.notNull()
		.references(() => user.id),
	impersonatedBy: text('impersonatedBy')
});

export const account = sqliteTable('account', {
	id: text('id').primaryKey(),
	accountId: text('accountId').notNull(),
	providerId: text('providerId').notNull(),
	userId: text('userId')
		.notNull()
		.references(() => user.id),
	accessToken: text('accessToken'),
	refreshToken: text('refreshToken'),
	idToken: text('idToken'),
	accessTokenExpiresAt: integer('accessTokenExpiresAt', {
		mode: 'timestamp'
	}),
	refreshTokenExpiresAt: integer('refreshTokenExpiresAt', {
		mode: 'timestamp'
	}),
	scope: text('scope'),
	password: text('password'),
	createdAt: integer('createdAt', {
		mode: 'timestamp'
	}).notNull(),
	updatedAt: integer('updatedAt', {
		mode: 'timestamp'
	}).notNull()
});

export const verification = sqliteTable('verification', {
	id: text('id').primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: integer('expiresAt', {
		mode: 'timestamp'
	}).notNull(),
	createdAt: integer('createdAt', {
		mode: 'timestamp'
	}),
	updatedAt: integer('updatedAt', {
		mode: 'timestamp'
	})
});

export const categoryTable = sqliteTable(
	'category',
	{
		id: integer('id').primaryKey(),
		name: text('name').notNull(),
		description: text('description'),
		subCategories: array<string>('sub_categories').notNull(),
		...timestamps
	},
	(table) => ({
		checkConstraint: check('name_check', sql`${table.name} < 1`)
	})
);

export const productTable = sqliteTable('product', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	categoryId: integer('category_id')
		.notNull()
		.references(() => categoryTable.id),
	subCategory: text('sub_category').notNull(),
	price: integer('price').notNull(),
	stock: integer('stock').notNull(),
	images: array<string>('images').notNull(),
	slug: text('slug').unique().notNull(),
	adminId: text('admin_id')
		.references(() => user.id)
		.notNull(),

	...timestamps
});

export const orderTable = sqliteTable('order', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	status: text('status', { enum: STATUS }).notNull(),
	amount: integer('amount').notNull(),
	products: integer('product_id')
		.notNull()
		.references(() => productTable.id),
	...timestamps
});
// Order to Product junction table
export const orderProductTable = sqliteTable(
	'order_product',
	{
		orderId: text('order_id')
			.notNull()
			.references(() => orderTable.id),
		productId: integer('product_id')
			.notNull()
			.references(() => productTable.id),
		quantity: integer('quantity').notNull().default(1)
		// Optional: Add any additional fields specific to this order-product relationship
	},
	(t) => ({
		pk: primaryKey({ columns: [t.orderId, t.productId] })
	})
);

// Relationships
export const orderRelations = relations(orderTable, ({ many, one }) => ({
	user: one(user, {
		fields: [orderTable.userId],
		references: [user.id]
	}),
	orderProducts: many(orderProductTable)
}));

export const productRelations = relations(productTable, ({ many, one }) => ({
	orderProducts: many(orderProductTable),
	category: one(categoryTable, {
		fields: [productTable.categoryId],
		references: [categoryTable.id]
	})
}));

export const orderProductRelations = relations(orderProductTable, ({ one }) => ({
	order: one(orderTable, {
		fields: [orderProductTable.orderId],
		references: [orderTable.id]
	}),
	product: one(productTable, {
		fields: [orderProductTable.productId],
		references: [productTable.id]
	})
}));

// export const categoryRelations = relations(categoryTable, ({ many }) => ({
// 	products: many(productTable)
// }));
