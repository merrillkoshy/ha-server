const pool = require("./db").pool;
const client = require("./db").client;
const pgp = require("./db").pgp;

require("dotenv").config();
const getListings = (req, res) => {
	client.query("select * from hadata", (err, data) => {
		if (err) {
			res.status(500).send(err.stack);
		} else {
			res.status(200).json(data);
		}
	});
};
const createListing = (req, res) => {
	const body = req.body;

	const {
		id,
		price,
		currencyCode,
		address,
		type,
		kind,
		description,
		deposit,
		estimatedBills,
		minimumStayMonths,
		maxBookableDays,
		moveInWindow,
		currentOccupancy,
		rules,
		minAge,
		maxAge,
		preferredGender,
		alias,
		externalReference,
		extraData,
		facilities,
		calendarOperations,
		images,
		costs,
	} = body;
	const insertQuery =
		"INSERT INTO hadata(id,price,currencyCode,address,type,kind,description,deposit,estimatedBills,minimumStayMonths,maxBookableDays,moveInWindow,currentOccupancy,rules,minAge,maxAge,preferredGender,alias,externalReference,extraData,facilities,calendarOperations,images,costs) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23 , $24)";
	client.query(
		insertQuery,
		[
			id,
			price,
			currencyCode,
			address,
			type,
			kind,
			description,
			deposit,
			estimatedBills,
			minimumStayMonths,
			maxBookableDays,
			moveInWindow,
			currentOccupancy,
			rules,
			minAge,
			maxAge,
			preferredGender,
			alias,
			externalReference,
			extraData,
			facilities,
			calendarOperations,
			images,
			costs,
		],
		(err, data) => {
			if (err) {
				res.status(500).send(err.stack);
			} else {
				res.header("Access-Control-Allow-Origin", "*");
				res.status(200).json(data);
			}
		}
	);
};
const deleteListing = (req, res) => {
	const id = req.params.id;

	pool
		.any("DELETE FROM hadata WHERE id = $1", [id])
		.then((data) => {
			res.header("Access-Control-Allow-Origin", "*");
			res.status(200).send(data);
		})
		.catch((err) => {
			res.status(500).send(err);
		});
};

module.exports = {
	getListings,
	createListing,
	deleteListing,
};
