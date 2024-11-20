import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin } from 'better-auth/plugins';

export function createAuth(db: any) {
	return betterAuth({
		database: drizzleAdapter(db, {
			provider: 'sqlite' // Use appropriate provider for D1
		}),
		emailAndPassword: {
			enabled: true
		},
		plugins: [admin()]
	});
}
