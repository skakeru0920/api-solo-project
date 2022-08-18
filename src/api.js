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

	getMakerByName(name) {
		return knex
			.select("id")
			.from("makers")
			.where({ maker: name })
			.first()
			.then((ret) => ret.id)
			.catch(() => undefined);
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
				cycle_id: "motorcycle.id",
				cycle_name: "name",
				cycle_displacement: "displacement",
				cycle_picture: "picture",
				cycle_maker_name: "makers.maker",
				cycle_sell_price: "sell_price",
				cycle_url: "url",
			})
			.from("motorcycle")
			.leftJoin("makers", { "makers.id": "motorcycle.maker_id" });
	},

	getMotorcycleById(target) {
		return knex
			.select({
				cycle_id: "motorcycle.id",
				cycle_name: "name",
				cycle_displacement: "displacement",
				cycle_picture: "picture",
				cycle_maker_name: "makers.maker",
				cycle_sell_price: "sell_price",
				cycle_url: "url",
			})
			.from("motorcycle")
			.leftJoin("makers", { "makers.id": "motorcycle.maker_id" })
			.where({ "motorcycle.id": target })
			.first();
	},

	getMotorcycleByMaker(maker) {
		return knex
			.select({
				cycle_id: "motorcycle.id",
				cycle_name: "name",
				cycle_displacement: "displacement",
				cycle_picture: "picture",
				cycle_maker_name: "makers.maker",
				cycle_sell_price: "sell_price",
				cycle_url: "url",
			})
			.from("motorcycle")
			.leftJoin("makers", { "makers.id": "motorcycle.maker_id" })
			.where({ maker_id: maker });
	},

	updateMotorcycle(target, after) {
		return knex("motorcycle")
			.where({ id: target })
			.update(after)
			.returning("id")
			.then((ret) => ret[0].id);
	},

	createMotorcycle(newobj) {
		return knex("motorcycle")
			.insert(newobj)
			.returning("id")
			.then((ret) => ret[0].id);
	},

	deleteMotorcycle(target) {
		return knex("motorcycle").where("id", target).del();
	},
};
