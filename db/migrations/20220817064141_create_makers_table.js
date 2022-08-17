/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("makers", (table) => {
		table.increments("id").primary();
		table.string("maker", 32).unique().notNullable().index();
		table.string("location", 32);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	knex.schema.dropTable("makers");
};
