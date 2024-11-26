import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin } from 'better-auth/plugins';
import type { DrizzleD1Database } from 'drizzle-orm/d1';
type Schema = typeof import('./server/db/schema');

export function createAuth(db: DrizzleD1Database<Schema>) {
	return betterAuth({
		database: drizzleAdapter(db, {
			provider: 'sqlite'
		}),
		emailAndPassword: {
			enabled: true,
			sendResetPassword: async ({ user, url, token }, request) => {
				console.log({ user, url, token });
			}
		},
		plugins: [admin()],
		user: {
			changeEmail: {
				enabled: true
			}
		}
	});
}
// const db = createDb('');
// export const auth = betterAuth({
// 	database: drizzleAdapter(db, {
// 		provider: 'sqlite'
// 	}),
// 	emailAndPassword: {
// 		enabled: true
// 	},
// 	plugins: [admin()]
// });
