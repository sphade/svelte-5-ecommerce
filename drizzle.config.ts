import { defineConfig } from 'drizzle-kit';
if (!process.env.CLOUDFLARE_ACCOUNT_ID) throw new Error('CLOUDFLARE_ACCOUNT_ID is not set');

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	dbCredentials: {
		accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
		token: process.env.CLOUDFLARE_API_TOKEN!,
		databaseId: process.env.CLOUDFLARE_DATABASE_ID!
	},
	verbose: true,
	strict: true,
	dialect: 'sqlite',
	out: './migrations',
	driver: 'd1-http'
});
