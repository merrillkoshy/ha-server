const { Pool, Client } = require("pg");

const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const pool = new Pool({
	connectionString,
	ssl: { rejectUnauthorized: false },
});

const client = new Client({
	connectionString,
	ssl: { rejectUnauthorized: false },
});
client.connect();

module.exports = { pool, client };
