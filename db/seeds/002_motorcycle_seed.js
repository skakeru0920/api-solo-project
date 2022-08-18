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
			picture:
				"<img src='https://www1.suzuki.co.jp/motor/lineup/files/images/productdetailimg_GSX250RAM1_BY7_2.jpg' />",
			maker_id: 3,
			sell_price: "581,900円(税込)",
			url: "https://www1.suzuki.co.jp/motor/lineup/gsx250rzm1/?page=top",
		},
		{
			id: 2,
			name: "GSX-R150",
			displacement: 150,
			picture:
				"<img src='https://motor-fan.jp/bikes/wp-content/uploads/sites/6/2022/08/f11d49ccb25f3e028da69b8093453d01.jpg' />",
			maker_id: 3,
			sell_price: "333333円(税込)",
			url: "https://www1.suzuki.co.jp/motor/lineup/gsx250rzm1/?page=top",
		},
		{
			id: 3,
			name: "ESTRELLA Final Edition",
			displacement: 249,
			picture:
				"<img src='https://img.webike-cdn.net/moto_img/cg/9/8059/L_758428514f64331e935424a74f.jpg' />",
			maker_id: 1,
			sell_price: "575,640円(税込)",
			url: "https://ja.wikipedia.org/wiki/%E3%82%AB%E3%83%AF%E3%82%B5%E3%82%AD%E3%83%BB%E3%82%A8%E3%82%B9%E3%83%88%E3%83%AC%E3%83%A4",
		},
		{
			id: 4,
			name: "CB400 SUPER FOUR",
			displacement: 398,
			picture:
				"<img src='https://www.honda.co.jp/CB400SF/assets/images/top/image-02.png' />",
			maker_id: 2,
			sell_price: "884,400円(税込)",
			url: "https://www.honda.co.jp/CB400SF",
		},
	]);
};
