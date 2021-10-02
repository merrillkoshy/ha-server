const { Pool, Client } = require("pg");

const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const pool = new Pool({
	connectionString,
});
pool.query("SELECT NOW()", (err, res) => {
	console.log(err, res);
	pool.end();
});
const client = new Client({
	connectionString,
});
client.connect();
// client.query("SELECT NOW()", (err, res) => {
// 	console.log(err, res);
// 	client.end();
// });
module.exports = { pool, client };
