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
});
