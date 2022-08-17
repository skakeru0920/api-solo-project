/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("motorcycle", (table) => {
		table.increments("id").primary();
		table.string("name", 32).unique().notNullable().index();
		table.float("displacement", 8).index();
		table.text("picture");
		// SASCADEでがいぶきーを張り直したい・・・
		table.integer("maker_id").references("id").inTable("makers").notNullable();
		table.string("sell_price", 32);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable("motorcycle");
};
