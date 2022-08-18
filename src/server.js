const express = require("express");
const knex = require("./knex");

const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("index");
});
app.get("/makers", async (req, res) => {
	const makers = await knex
		.select({
			maker_id: "id",
			maker_name: "maker",
			maker_location: "location",
		})
		.from("makers");

	console.log(makers);
	res.render("makers", {
		makers,
	});
});
app.listen(3000, () => {
	console.log("Server listening!");
});
