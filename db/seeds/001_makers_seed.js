/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("makers").del();
	await knex("makers").insert([
		{ id: 1, maker: "Kawasaki", location: "Japan" },
		{ id: 2, maker: "Honda", location: "Japan" },
		{ id: 3, maker: "Suzuki", location: "Japan" },
	]);
};
