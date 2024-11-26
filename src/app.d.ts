import type { TUser } from '$lib/types';
import type { DrizzleD1Database } from 'drizzle-orm/d1';

// for information about these interfaces
type Schema = typeof import('./lib/server/db/schema');
declare global {
	namespace App {
		interface Platform {
			env: {
				DB: D1Database;
				BUCKET: R2Bucket;
			};
			cf: CfProperties;
			ctx: ExecutionContext;
		}

		interface Locals {
			db: DrizzleD1Database<Schema>;
			bucket: R2Bucket;
		}
		interface PageData {
			user: TUser;
		}
		namespace Superforms {
			type Message = {
				type: 'error' | 'success';
				text: string;
			};
		}
	}
}

export {};
