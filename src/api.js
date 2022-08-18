const knex = require("./knex");

module.exports = {
	getMakerAll() {
		return knex
			.select({
				maker_id: "id",
				maker_name: "maker",
				maker_location: "location",
			})
			.from("makers");
	},

	getMakerById(target) {
		return knex.select().from("makers").where({ id: target }).first();
	},

	updateMaker(target, after) {
		return knex("makers")
			.where({ id: target })
			.update(after)
			.returning("id")
			.then((ret) => ret[0].id);
	},

	createMaker(after) {
		return knex("makers")
			.insert(after)
			.returning("id")
			.then((ret) => ret[0].id);
	},

	getMotorcycleAll() {
		return knex
			.select({
				cycle_id: "id",
				cycle_name: "name",
				cycle_displacement: "displacement",
				cycle_picture: "picture",
				cycle_maker_id: "maker_id",
				cycle_sell_price: "sell_price",
				cycle_url: "url",
			})
			.from("motorcycle");
	},
};
