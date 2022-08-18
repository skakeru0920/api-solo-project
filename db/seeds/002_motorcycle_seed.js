/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("motorcycle").del();
	await knex("motorcycle").insert([
		{
			id: 1,
			name: "GSX250R",
			displacement: 248,
			picture: "https://ibb.co/QD4NF2w",
			maker_id: 3,
			sell_price: "581,900円(税込)",
			url: "https://www1.suzuki.co.jp/motor/lineup/gsx250rzm1/?page=top",
		},
		{
			id: 2,
			name: "GSX150R",
			displacement: 150,
			maker_id: 3,
			sell_price: "333333円(税込)",
			url: "https://www1.suzuki.co.jp/motor/lineup/gsx250rzm1/?page=top",
		},
		{
			id: 3,
			name: "ESTRELLA Final Edition",
			displacement: 249,
			maker_id: 1,
			sell_price: "575,640円(税込)",
			url: "https://ja.wikipedia.org/wiki/%E3%82%AB%E3%83%AF%E3%82%B5%E3%82%AD%E3%83%BB%E3%82%A8%E3%82%B9%E3%83%88%E3%83%AC%E3%83%A4",
		},
	]);
};
