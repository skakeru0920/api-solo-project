const express = require("express");
const api = require("./api");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("index");
});
app.get("/makers", async (req, res) => {
	const makers = await api.getMakerAll();
	console.log(makers);
	res.render("makers", {
		makers,
	});
});

app.get("/makers/view/:id", async (req, res) => {
	const id = parseInt(req.params.id);
	const maker = await api.getMakerById(id);
	res.render("view-maker", {
		maker,
	});
});

app.get("/makers/edit/:id", async (req, res) => {
	const id = parseInt(req.params.id);
	const maker = await api.getMakerById(id);
	const type = "Edit";
	res.render("input-maker", {
		maker,
		type,
	});
});

app.get("/makers/new", async (req, res) => {
	const type = "Create";
	const maker = {
		id: undefined,
	};
	res.render("input-maker", {
		type,
		maker,
	});
});

app.post("/makers/edit/:id/save", async (req, res) => {
	const { makerName, makerLocation, id } = req.body;
	const payload = {
		maker: makerName,
		location: makerLocation,
	};
	const newId = await api.updateMaker(id, payload);
	res.redirect(`/makers/view/${newId}`);
});

app.post("/makers/post", async (req, res) => {
	const { makerName, makerLocation } = req.body;
	const payload = {
		maker: makerName,
		location: makerLocation,
	};
	const newId = await api.createMaker(payload);
	res.redirect(`/makers/view/${newId}`);
});
app.listen(3000, () => {
	console.log("Server listening!");
});
