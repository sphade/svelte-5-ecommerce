import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { createAuth } from '$lib/server/auth';
import { createDb } from '$lib/server/db';

const handleAuth: Handle = async ({ event, resolve }) => {
	const { db } = event.locals;
	const auth = createAuth(db);
	return svelteKitHandler({ event, resolve, auth });
};

export const handleDb: Handle = async ({ event, resolve }) => {
	// Initialize database client
	const platform = event.platform;
	if (platform) {
		const db = createDb(platform.env.DB);

		event.locals.db = db;
		event.locals.bucket = platform.env.BUCKET;
	}

	return resolve(event);
};

const preloadFonts: Handle = async ({ event, resolve }) => {
	const response = await resolve(event, {
		preload: ({ type }) => type === 'font'
	});

	return response;
};
export const handle = sequence(preloadFonts, handleDb, handleAuth);
