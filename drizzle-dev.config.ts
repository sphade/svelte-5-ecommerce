import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	verbose: true,
	strict: true,
	dialect: 'sqlite',
	out: './migrations',
	dbCredentials: {
		url: '.wrangler/state/v3/d1/miniflare-D1DatabaseObject/0a14c4ba616f6beafd9a496c4e365c2f1303b50f3cb83da3b91044a12ee5b3e5.sqlite'
	}
});
