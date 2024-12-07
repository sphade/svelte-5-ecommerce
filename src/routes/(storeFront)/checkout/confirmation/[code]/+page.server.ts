export const load = async ({ locals: { db }, params }) => {
	const { code } = params;
	const order = await db.query.orderTable.findFirst({
		where: (t, { eq }) => eq(t.code, code),
		with: {
			orderProducts: {
				with: {
					product: true
				}
			}
		}
	});
	return {
		order
	};
};
