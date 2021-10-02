const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

const { getListings, createListing, deleteListing } = require("./pgcrud");
const cors = require("cors");
const corsOptions = {
	origin: "*",
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.options("/listing", function(req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "*");
	res.setHeader("Access-Control-Allow-Headers", "*");
	res.end();
});
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
	createListing(req, res)
		.then((res) => {
			res.header("Access-Control-Allow-Origin", "*");
			res.status(200).json(res);
		})
		.catch((error) => {
			res.status(500).send(error);
		});
});

app.delete("/listing/:id", (req, res) => {
	if (req.headers.jwtSecret == process.env.jwtSecret) {
		deleteListing(req.params.id)
			.then((res) => {
				res.header("Access-Control-Allow-Origin", "*");
				res.status(200).send(res);
			})
			.catch((error) => {
				res.status(500).send(error);
			});
	} else {
		res.json({
			info:
				"Else you could contact me : https://www.linkedin.com/in/merrill-koshy-thomas",
		});
	}
});
app.listen(port, () => {
	console.log(`App running on port ${port}.`);
});
