var promise = require("bluebird");
var options = {
	// Initialization Options
	promiseLib: promise,
};
var pgp = require("pg-promise")(options);
var connectionString = isProduction
	? process.env.DATABASE_URL
	: connectionString;
var db = pgp(connectionString);

module.exports = db;
