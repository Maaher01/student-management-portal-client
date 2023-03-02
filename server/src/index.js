const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { databaseConnection } = require("./config/config");
const { pool } = require("./config/config");

const app = express();

const PORT = process.env.PORT || 3000;

//Middlewares
app.use(cors({ credentials: true, origin: "http://localhost:4200" }));
app.use(express.json());

const server = app.listen(PORT, async () => {
	await databaseConnection();
	console.log(`Server is running on port ${PORT}`);
});

pool.connect((err, client, release) => {
	if (err) {
		return console.err("Error acquiring client", err.stack);
	}
	client.query("SELECT NOW()", (err, result) => {
		release();
		if (err) {
			return console.error("Error executing query", err.stack);
		} else {
			console.log("Connected to database");
		}
	});
});

app.get("/students", (req, res, next) => {
	pool.query("SELECT * FROM students").then((data) => {
		res.send(data.rows);
	});
});

app.get("/student/:id", (request, response) => {
	const id = parseInt(request.params.id);

	pool.query("SELECT * FROM students WHERE id = $1", [id], (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	});
});

app.delete("/delete/:id", (request, response) => {
	const id = parseInt(request.params.id);

	pool.query("DELETE FROM students WHERE id = $1", [id], (error, results) => {
		if (error) {
			throw error;
		} else {
			response.status(200).send({ code: 200, message: "Deleted successfully" });
		}
	});
});

app.post("/students", (request, response) => {
	console.log("request", request.body);
	const {
		name,
		id,
		department,
		semester,
		cgpa,
		mobile,
		email,
		dob,
		gender,
		address,
		fatherName,
		motherName,
	} = request.body;

	pool.query(
		"INSERT INTO students (name, id, department, semester_no, current_cgpa, mobile_no, email, dob, gender, address, father_name, mother_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
		[
			name,
			id,
			department,
			semester,
			cgpa,
			mobile,
			email,
			dob,
			gender,
			address,
			fatherName,
			motherName,
		],
		(error, results) => {
			if (error) {
				throw error;
			}
			response.status(200).send({ code: 200, message: "Saved successfully" });
		}
	);
});

app.post("/users", (request, response) => {
	console.log("request", request.body);
	const { name, email, password } = request.body;

	pool.query(
		"INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
		[name, email, password],
		(error, results) => {
			if (error) {
				throw error;
			}
			response.status(200).send({ code: 200, message: "Saved successfully" });
		}
	);
});

app.put("/update/:id", (request, response) => {
	const id = parseInt(request.params.id);
	const {
		name,
		department,
		semester,
		cgpa,
		mobile,
		email,
		dob,
		gender,
		address,
		fatherName,
		motherName,
	} = request.body;
	console.log("request", request.body);
	pool.query(
		"UPDATE students SET name = $1, department = $2, semester_no = $3, current_cgpa = $4, mobile_no = $5, email = $6, dob = $7, gender = $8, address = $9, father_name = $10, mother_name = $11 WHERE id = $12",
		[
			name,
			department,
			semester,
			cgpa,
			mobile,
			email,
			dob,
			gender,
			address,
			fatherName,
			motherName,
			id,
		],
		(error, results) => {
			if (error) {
				throw error;
			}
			response.status(200).send({ message: `User modified with ID: ${id}` });
		}
	);
});

app.post("/login", async function (req, res) {
	const { email, password } = req.body;
	try {
		const data = await pool.query(`SELECT * FROM users WHERE email=$1;`, [
			email,
		]);
		const user = data.rows;
		if (user.length === 0) {
			return res
				.status(400)
				.json({ error: "User is not registered, sign up first" });
		} else if (password !== user[0].password) {
			return res.status(401).json({ error: "Invalid credentials" });
		} else {
			return res.status(200).json({ user: user[0] });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Internal Server error" });
	}
});

app.post("/forgot", async function (req, res) {
	const { name } = req.body;
	try {
		const data = await pool.query(`SELECT * FROM users WHERE name=$1;`, [name]);
		const user = data.rows;
		if (user.length === 0) {
			return res
				.status(400)
				.json({ error: "User is not registered, sign up first" });
		} else {
			return res.status(200).json({ user: user[0] });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Internal Server error" });
	}
});
