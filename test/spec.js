const { expect, assert } = require("chai");
const config = require("../knexfile");
const knex = require("knex")(config);
const api = require("../src/api");

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

	describe("about makers table", () => {
		it("getMakersAll にアクセスするとmakersの配列が返る", async () => {
			const makers = await api.getMakerAll();
			expect(makers).to.be.an.instanceof(Array);
		});

		it("getMakersByID で任意のidのmakerが取得できる", async () => {
			const suzuki = await api.getMakerById(3);
			expect(suzuki.maker).to.eql("Suzuki");
		});

		it("getMakerById で存在しないIdを指定したときはundefinedが返る", async () => {
			const undefi = await api.getMakerById(999988);
			expect(undefi).to.be.undefined;
		});

		it("getMakersByName で任意の名前のmakerが取得できる", async () => {
			const suzuki = await api.getMakerByName("Suzuki");
			expect(suzuki).to.eql(3);
		});

		it("getMakersByName で存在しないNameを指定したときはundefinedが返る", async () => {
			const undefi = await api.getMakerByName("adfghhjkl;");
			expect(undefi).to.be.undefined;
		});

		it("updateMaker で任意のidのmakerの情報を更新した際に更新したIDが返る", async () => {
			const suzuki = await api.getMakerById(3);
			expect(suzuki.maker).to.eql("Suzuki");

			const updateId = await api.updateMaker(3, { maker: "Sato" });
			expect(updateId).to.eql(3);
			const res = await api.updateMaker(3, { maker: "Suzuki" });
		});

		it("updateMaker で任意のidのmakerの情報を更新できる", async () => {
			const suzuki = await api.getMakerById(3);
			expect(suzuki.maker).to.eql("Suzuki");

			const updateId = await api.updateMaker(3, { maker: "Sato" });
			const after = await api.getMakerById(3);
			expect(after.maker).to.eql("Sato");
			const res = await api.updateMaker(3, { maker: "Suzuki" });
		});

		it("createMaker で新しいmakerを作った際にnew idが返る", async () => {
			const newid = 999888;
			const newMaker = {
				id: newid,
				maker: "Kakeru zyuko",
				location: "Hadano",
			};
			const res = await api.createMaker(newMaker);
			expect(res).to.eql(newid);
			await knex.from("makers").where("id", newid).del().catch(console.error);
		});

		it("createMaker で新しくmakerを作成できる", async () => {
			const newid = 999888;
			const newMaker = {
				id: newid,
				maker: "Kakeru zyuko",
				location: "Hadano",
			};
			const res = await api.createMaker(newMaker);
			const createdMaker = await api.getMakerById(res);
			expect(createdMaker).to.deep.eql(newMaker);
			await knex.from("makers").where("id", newid).del().catch(console.error);
		});
	});

	describe("about motorcycle table", () => {
		it("getMotorcycleAll はmotorcycleの配列を返す", async () => {
			const cycles = await api.getMotorcycleAll();
			expect(cycles).to.be.an.instanceof(Array);
		});

		it("getMotorcycleById で任意のidのmotorcycleが取得できる", async () => {
			const estrella = await api.getMotorcycleById(3);
			expect(estrella.cycle_name).to.eql("ESTRELLA Final Edition");
		});

		it("getMotorcycleById で存在しないIdを指定したときはundefinedが返る", async () => {
			const undefi = await api.getMotorcycleById(999988);
			expect(undefi).to.be.undefined;
		});

		it("getMotorcycleByMaker で任意のmaker_idのmotorcycleが取得できる", async () => {
			const suzukis_cycle = await api.getMotorcycleByMaker(3);
			expect(suzukis_cycle).to.be.an.instanceof(Array);
		});

		it("updateMotorcycle で任意のidのmotorcycleの情報を更新した際に更新したIDが返る", async () => {
			const gsx250r = await api.getMotorcycleById(1);
			expect(gsx250r.cycle_name).to.eql("GSX250R");

			const updateId = await api.updateMotorcycle(1, { name: "XXXX" });
			expect(updateId).to.eql(1);
			await api.updateMotorcycle(1, { name: "GSX250R" });
		});

		it("updateMotorcycle で任意のidのmotorcycleの情報を更新できる", async () => {
			const gsx250r = await api.getMotorcycleById(1);
			expect(gsx250r.cycle_name).to.eql("GSX250R");

			const updateId = await api.updateMotorcycle(1, { name: "XXXX" });
			const after = await api.getMotorcycleById(1);
			expect(after.cycle_name).to.eql("XXXX");
			await api.updateMotorcycle(1, { name: "GSX250R" });
		});

		it("createMotorcycle で新しいMotorcycleを作った際にnew idが返る", async () => {
			const newid = 999888;
			const newMotorcycle = {
				id: newid,
				name: "this is unique",
				maker_id: 1,
			};
			const res = await api.createMotorcycle(newMotorcycle);
			expect(res).to.eql(newid);
			await knex
				.from("motorcycle")
				.where("id", newid)
				.del()
				.catch(console.error);
		});

		it("createMotorcycle で新しくMotorcycleを作成できる", async () => {
			const newid = 999888;
			const newMotorcycle = {
				id: newid,
				name: "this is unique",
				maker_id: 1,
			};
			const res = await api.createMotorcycle(newMotorcycle);
			const createdCycle = await api.getMotorcycleById(res);
			const maker_id = await api.getMakerByName(createdCycle.cycle_maker_name);
			expect(createdCycle.cycle_id).to.deep.eql(newMotorcycle.id);
			expect(createdCycle.cycle_name).to.deep.eql(newMotorcycle.name);
			expect(maker_id).to.deep.eql(newMotorcycle.maker_id);
			await knex
				.from("motorcycle")
				.where("id", newid)
				.del()
				.catch(console.error);
		});

		it("deleteMotorcycleで既存のmotorcycleを削除できる", async () => {
			const newid = 999888;
			const newMotorcycle = {
				id: newid,
				name: "this is unique",
				maker_id: 1,
			};
			const res = await api.createMotorcycle(newMotorcycle);
			const createdCycle = await api.getMotorcycleById(res);
			expect(createdCycle).to.not.be.undefined;

			await api.deleteMotorcycle(newid);
			const after = await api.getMotorcycleById(res);
			expect(after).to.be.undefined;
		});
	});
});
