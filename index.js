const express = require("express");
const app = express();
const port = 3001;

const { getListings, createListing, deleteListing } = require("./pgcrud");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.get("/", (request, response) => {
	response.json({ info: "Node.js, Express, and Postgres API" });
});
app.get("/listing", (req, res) => {
	try {
		getListings(req, res);
	} catch (error) {
		res.status(500).send(error);
	}
});

app.post("/listing", async (req, res) => {
	createListing(req, res)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(500).send(error);
		});
});

app.delete("/listing/:id", (req, res) => {
	deleteListing(req.params.id)
		.then((response) => {
			res.status(200).send(response);
		})
		.catch((error) => {
			res.status(500).send(error);
		});
});
app.listen(port, () => {
	console.log(`App running on port ${port}.`);
});
