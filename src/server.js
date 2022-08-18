const express = require("express");
const { deleteMotorcycle } = require("./api");
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
	const motorcycles = await api.getMotorcycleByMaker(id);
	res.render("view-maker", {
		maker,
		motorcycles,
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

app.get("/motorcycle", async (req, res) => {
	const motorcycles = await api.getMotorcycleAll();
	console.log(motorcycles);
	res.render("motorcycles", {
		motorcycles,
	});
});

app.get("/motorcycle/view/:id", async (req, res) => {
	const id = parseInt(req.params.id);
	const motorcycle = await api.getMotorcycleById(id);
	res.render("view-motorcycle", {
		motorcycle,
	});
});

app.get("/motorcycle/edit/:id", async (req, res) => {
	const id = parseInt(req.params.id);
	const motorcycle = await api.getMotorcycleById(id);
	const type = "Edit";
	res.render("input-motorcycle", {
		motorcycle,
		type,
	});
});

app.get("/motorcycle/new", async (req, res) => {
	const type = "Create";
	const motorcycle = {
		id: undefined,
	};
	res.render("input-motorcycle", {
		type,
		motorcycle,
	});
});

app.post("/motorcycle/edit/:id/save", async (req, res) => {
	const {
		cycleName,
		makerName,
		cycleSellPrice,
		cycleDisplacement,
		cycleUrl,
		cyclePicture,
		id,
	} = req.body;
	const makerId = await api.getMakerByName(makerName);
	const payload = {
		name: cycleName,
		displacement: cycleDisplacement,
		picture: cyclePicture,
		maker_id: makerId,
		sell_price: cycleSellPrice,
		url: cycleUrl,
	};
	const newId = await api.updateMotorcycle(id, payload);
	res.redirect(`/motorcycle/view/${newId}`);
});

app.post("/motorcycle/post", async (req, res) => {
	const {
		cycleName,
		makerName,
		cycleSellPrice,
		cycleDisplacement,
		cycleUrl,
		cyclePicture,
	} = req.body;
	const makerId = await api.getMakerByName(makerName);

	const payload = {
		name: cycleName,
		displacement: cycleDisplacement,
		picture: cyclePicture,
		maker_id: makerId,
		sell_price: cycleSellPrice,
		url: cycleUrl,
	};
	const newId = await api.createMotorcycle(payload);
	res.redirect(`/motorcycle/view/${newId}`);
});

app.post("/motorcycle/delete/:id/", async (req, res) => {
	const { id } = req.body;
	await deleteMotorcycle(id);
	res.redirect("/motorcycle");
});

app.listen(3000, () => {
	console.log("Server listening!");
});
