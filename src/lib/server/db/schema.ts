import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const timestamps = {
	updatedAt: text('updated_at').default(sql`(CURRENT_TIMESTAMP)`),
	createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`)
};
export function array<T>() {
	return text('', { mode: 'json' }).$type<T[]>();
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
	role: text('role'),
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
	expiresAt: integer('expiresAt', {
		mode: 'timestamp'
	}),
	password: text('password')
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
	})
});
