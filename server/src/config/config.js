const { Pool } = require("pg");

const credentials = {
	database: process.env.DATABASE_NAME,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	port: process.env.DATABASE_PORT,
};

const pool = new Pool(credentials);

const databaseConnection = async () => {
	try {
		await pool.connect();
		console.log("Connected to database");
	} catch (error) {
		console.log("Failed to connect to database", error);
	}
};

module.exports = {
	pool,
	databaseConnection,
};
