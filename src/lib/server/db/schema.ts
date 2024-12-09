import { ROLE, STATUS } from '../../constant';
import { relations, sql } from 'drizzle-orm';
import { sqliteTable, text, integer, primaryKey, check, index } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';
// ;
export const timestamps = {
	updatedAt: integer('updated_at', {
		mode: 'timestamp'
	})
		.notNull()
		.$onUpdate(() => new Date()),
	createdAt: integer('created_at', {
		mode: 'timestamp'
	})
		.notNull()
		.$default(() => new Date())
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

export const categoryTable = sqliteTable('category', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	subCategories: array<string>('sub_categories').notNull(),
	...timestamps
});

export const productTable = sqliteTable(
	'product',
	{
		id: integer('id').primaryKey(),
		name: text('name').notNull(),
		description: text('description').notNull(),
		categoryId: integer('category_id')
			.notNull()
			.references(() => categoryTable.id, { onDelete: 'cascade' }),
		subCategory: text('sub_category').notNull(),
		price: integer('price').notNull(),
		stock: integer('stock').notNull(),
		images: array<{ fileUrl: string; key: string }>('images').notNull(),
		slug: text('slug').unique().notNull(),
		sku: text('sku').$default(() => `SKU-${nanoid(8)}`),
		adminId: text('admin_id')
			.references(() => user.id)
			.notNull(),
		...timestamps
	},
	(t) => {
		return {
			nameIdx: index('name_idx').on(t.name),
			descIdx: index('desc_idx').on(t.description)
		};
	}
);
export const addressTable = sqliteTable('address', {
	id: integer('id').primaryKey(),
	label: text('label').notNull(),
	address: text('address').notNull(),
	state: text('state'),
	country: text('country').notNull(),
	isDefaultShipping: integer('is_default_shipping', { mode: 'boolean' }).notNull(),
	isDefaultBilling: integer('is_default_billing', { mode: 'boolean' }).notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	...timestamps
});
export const cartTable = sqliteTable('cart', {
	id: integer('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	...timestamps
});
export const cartItemTable = sqliteTable(
	'cart_item',
	{
		cartId: integer('cart_id')
			.notNull()
			.references(() => cartTable.id, { onDelete: 'cascade' }),
		productId: integer('product_id')
			.notNull()
			.references(() => productTable.id, { onDelete: 'cascade' }),
		quantity: integer('quantity').notNull().default(1),

		priceAtTimeOfAddition: integer('price_at_addition').notNull(),
		...timestamps
	},
	(table) => ({
		// Ensure unique combination of cart and product to prevent duplicate entries
		pk: primaryKey({ columns: [table.cartId, table.productId] })
	})
);

export const orderTable = sqliteTable('order', {
	id: integer('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	status: text('status', { enum: STATUS }).notNull(),
	amount: integer('amount').notNull(),
	addressId: integer('address_id')
		.references(() => addressTable.id)
		.notNull(),
	code: text('code')
		.notNull()
		.$default(() => nanoid(8)),

	...timestamps
});
// Order to Product junction table
export const orderProductTable = sqliteTable(
	'order_product',
	{
		orderId: integer('order_id')
			.notNull()
			.references(() => orderTable.id, { onDelete: 'cascade' }),
		productId: integer('product_id')
			.notNull()
			.references(() => productTable.id, { onDelete: 'cascade' }),
		quantity: integer('quantity').notNull().default(1),
		// Optional: Add any additional fields specific to this order-product relationship
		...timestamps
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
export const userRelation = relations(user, ({ many, one }) => ({
	addresses: many(addressTable),
	cart: one(cartTable),
	orders: many(orderTable)
}));

export const addressRelations = relations(addressTable, ({ one }) => ({
	user: one(user, {
		fields: [addressTable.userId],
		references: [user.id]
	})
}));
export const cartRelations = relations(cartTable, ({ many, one }) => ({
	user: one(user, {
		fields: [cartTable.userId],
		references: [user.id]
	}),
	cartItems: many(cartItemTable)
}));

export const cartItemRelations = relations(cartItemTable, ({ one }) => ({
	cart: one(cartTable, {
		fields: [cartItemTable.cartId],
		references: [cartTable.id]
	}),
	product: one(productTable, {
		fields: [cartItemTable.productId],
		references: [productTable.id]
	})
}));

export const categoryRelations = relations(categoryTable, ({ many }) => ({
	products: many(productTable)
}));
