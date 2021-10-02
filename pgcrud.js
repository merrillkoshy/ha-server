const pool = require("./db").db;
const pgp = require("./db").pgp;

require("dotenv").config();
const getListings = (req, res) => {
	pool
		.any("select * from hadata")
		.then(function(data) {
			res.status(200).json(data);
		})
		.catch(function(err) {
			res.status(500).send(err);
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
	// const addressCs=new pgp.helpers.ColumnSet([],)
	const cs = new pgp.helpers.ColumnSet(
		[
			"id",
			"price",
			"currencyCode",
			"address",
			"type",
			"kind",
			"description",
			"deposit",
			"estimatedBills",
			"minimumStayMonths",
			"maxBookableDays",
			"moveInWindow",
			"currentOccupancy",
			"rules",
			"minAge",
			"maxAge",
			"preferredGender",
			"alias",
			"externalReference",
			"extraData",
			"facilities",
			"calendarOperations",
			"images",
			"costs",
		],
		{ table: "hadata" }
	);

	pool
		.any(pgp.helpers.insert(body, cs))

		.then((data) => {
			res.header("Access-Control-Allow-Origin", "*");
			res.status(200).send(data);
		})
		.catch((err) => {
			res.status(500).send(err);
		});
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
