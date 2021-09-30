var promise = require("bluebird");
var options = {
	// Initialization Options
	promiseLib: promise,
};
require("dotenv").config();
const isProduction = process.env.NODE_ENV === "production";
var pgp = require("pg-promise")(options);
const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

var db = pgp({
	connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
	ssl: true,
});

module.exports = db;
