import {
	addressTable,
	cartItemTable,
	cartTable,
	categoryTable,
	productTable,
	user
} from './server/db/schema';

export type TUser = typeof user.$inferSelect;
export type TAddress = typeof addressTable.$inferSelect;
export type TCart = typeof cartTable.$inferSelect;
export type TCartItem = typeof cartItemTable.$inferSelect;
export type TProduct = typeof productTable.$inferSelect;
export type TCategories = typeof categoryTable.$inferSelect;
//  export type TUserWithAddress = TUser & { addresses: TAddress[] }
