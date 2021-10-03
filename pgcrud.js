const pool = require("./db").pool;
const client = require("./db").client;

require("dotenv").config();
const getListings = (req, res) => {
	client.query("select * from hadata", (err, data) => {
		if (err) {
			res.status(500).send(err.stack);
		} else {
			res.status(200).json(data.rows);
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
		"INSERT INTO hadata(id,price,currencyCode,address,type,kind,description,deposit,estimatedBills,minimumStayMonths,maxBookableDays,moveInWindow,currentOccupancy,rules,minAge,maxAge,preferredGender,alias,externalReference,extraData,facilities,calendarOperations,images,costs) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23 , $24) RETURNING *";
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
				res.status(200).json(data.rows[0]);
			}
		}
	);
};
const deleteListing = (req, res) => {
	const id = req.params.id;
	const deleteQuery = "DELETE FROM hadata WHERE id = $1";
	client.query(deleteQuery, [id], (err, data) => {
		if (err) {
			res.status(500).send(err.stack);
		} else {
			res.header("Access-Control-Allow-Origin", "*");
			res.status(200).send("success");
		}
	});
};
const updateListing = (req, res) => {
	const body = req.body;
	const { id, price, currencyCode } = body;
	const updateQuery =
		"UPDATE hadata SET (price,currencyCode)= ($1, $2) WHERE id= $3";
	client.query(updateQuery, [price, currencyCode, id], (err, data) => {
		if (err) {
			res.status(500).send(err.stack);
		} else {
			res.status(200).json(data.rows);
		}
	});
};
module.exports = {
	getListings,
	createListing,
	deleteListing,
	updateListing,
};
