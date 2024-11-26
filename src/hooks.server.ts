import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { createDb } from '$lib/server/db';
import { createAuth } from '$lib/auth';

const adminRoutes = ['/admin', '/admin/*'];
const protectedUserRoutes = ['/me', '/checkout'];
const handleAuth: Handle = async ({ event, resolve }) => {
	const { locals, url, request } = event;
	const { db } = locals;
	const auth = createAuth(db);
	const session = await auth.api.getSession({
		headers: request.headers
	});

	if (url.pathname.startsWith('/admin') && session?.user.role !== 'admin') {
		redirect(303, '/');
	}
	const isProtectedUserRoute = protectedUserRoutes.some((route) => url.pathname.startsWith(route));
	if (isProtectedUserRoute && !session) {
		redirect(303, '/');
	}

	return svelteKitHandler({ event, resolve, auth });
};

export const handleDb: Handle = async ({ event, resolve }) => {
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
