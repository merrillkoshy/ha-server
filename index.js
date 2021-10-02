const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

const { getListings, createListing, deleteListing } = require("./pgcrud");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.get("/", (request, response) => {
	response.json({ info: "A House for HA's server. Built by Merrill." });
});
app.get("/listing", (req, res) => {
	try {
		getListings(req, res);
	} catch (error) {
		res.status(500).send(error);
	}
});

app.post("/listing", async (req, res) => {
	if (req.headers.jwtToken == process.env.jwtSecret) {
		createListing(req, res)
			.then((response) => {
				res.status(200).json(response);
			})
			.catch((error) => {
				res.status(500).send(error);
			});
	} else {
		response.json({
			info:
				"Else you could contact me : https://www.linkedin.com/in/merrill-koshy-thomas",
		});
	}
});

app.delete("/listing/:id", (req, res) => {
	if (req.headers.jwtToken == process.env.jwtSecret) {
		deleteListing(req.params.id)
			.then((response) => {
				res.status(200).send(response);
			})
			.catch((error) => {
				res.status(500).send(error);
			});
	} else {
		response.json({
			info:
				"Else you could contact me : https://www.linkedin.com/in/merrill-koshy-thomas",
		});
	}
});
app.listen(port, () => {
	console.log(`App running on port ${port}.`);
});
