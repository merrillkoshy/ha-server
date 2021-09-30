var promise = require("bluebird");
var options = {
	// Initialization Options
	promiseLib: promise,
	ssl: true,
};
require("dotenv").config();
const isProduction = process.env.NODE_ENV === "production";
var pgp = require("pg-promise")(options);
var connectionString = isProduction
	? process.env.DATABASE_URL
	: connectionString;
var db = pgp(connectionString);
pgp.pg.defaults.ssl = true;

module.exports = db;
