import { adminClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/svelte'; // make sure to import from better-auth/svelte
export const authClient = createAuthClient({
	baseURL: 'http://localhost:5173',
	plugins: [adminClient()]
});
