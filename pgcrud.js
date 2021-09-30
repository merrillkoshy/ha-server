const pool = require("./db");

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
	pool
		.none(
			"INSERT INTO hadata(id,price,currencyCode,address,type,kind,description,deposit,estimatedBills,minimumStayMonths,maxBookableDays,moveInWindow,currentOccupancy,rules,minAge,maxAge,preferredGender,alias,externalReference,extraData,facilities,calendarOperations,images,costs) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23 , $24)",
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
			]
		)
		.then((data) => {
			res.status(200).send(data);
		})
		.catch((err) => {
			res.status(500).send(err);
		});
};
const deleteListing = (id) => {
	return new Promise(function(resolve, reject) {
		pool.query("DELETE FROM hadata WHERE id = $1", [id], (error, results) => {
			if (error) {
				reject(error);
			}
			resolve(`Listing deleted with ID: ${id}`);
		});
	});
};

module.exports = {
	getListings,
	createListing,
	deleteListing,
};
