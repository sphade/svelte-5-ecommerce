import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	verbose: true,
	strict: true,
	dialect: 'sqlite',
	out: './migrations',
	dbCredentials: {
		url: '.wrangler/state/v3/d1/miniflare-D1DatabaseObject/e7352547963de7050bd7d94658afc4fe78b61811b7815da12d90be8e863abf4d.sqlite'
	}
});
