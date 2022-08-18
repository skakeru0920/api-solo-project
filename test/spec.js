const { expect, assert } = require("chai");
const config = require("../knexfile");
const knex = require("knex")(config);

describe("api-solo-project", () => {
	describe("setup", () => {
		it("should connect to database", async () => {
			await knex.raw("select 1 as result").catch(() => {
				assert.fail("unable to connect to database");
			});
		});

		it("has run the initial migration", async () => {
			await knex("makers")
				.select()
				.catch(() => assert.fail("makers table is not found."));

			await knex("motorcycle")
				.select()
				.catch(() => assert.fail("motorcycle table is not found."));
		});
	});
});
