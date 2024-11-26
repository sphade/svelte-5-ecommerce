// src/routes/api/r2/[...file]/+server.ts
import { dev } from '$app/environment';

export const GET = async ({ locals, params }) => {
	if (!dev) {
		return new Response('Not Found', { status: 404 });
	}

	const { bucket } = locals;
	const fileName = params.file;

	try {
		const object = await bucket.get(fileName);

		if (object === null) {
			return new Response('File not found', { status: 404 });
		}

		return new Response(object.body, {
			headers: {
				'Content-Type': object.httpMetadata?.contentType || 'application/octet-stream',
				'Cache-Control': 'public, max-age=31536000'
			}
		});
	} catch (error) {
		console.error('Error serving BUCKET file:', error);
		return new Response('Internal Server Error', { status: 500 });
	}
};
