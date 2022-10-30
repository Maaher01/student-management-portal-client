const express = require('express')
const cors = require('cors')
const { Client } = require('pg')
const app = express()

app.use(cors())
app.use(express.json());

const port = 3000
const Pool = require('pg').Pool

//Database details
const pool = new Pool({
    user: 'maaher',
    host: 'localhost',
    database: 'student',
    password: '123',
    dialect: 'postgres',
    port: 5432
})

pool.connect((err, client, release) => {
    if (err) {
        return console.err('Error acquiring client', err.stack)
    }
    client.query('SELECT NOW()', (err, result) => {
        release()
        if (err) {
            return console.error('Error executing query', err.stack)
        } else {
            console.log("Connected to database")
        }
    })
})

app.get('/students', (req, res, next) => {
    pool.query('SELECT * FROM students').then(data => {
        res.send(data.rows)
    })
})

app.get('/student/:id', (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM students WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
})

app.delete('/delete/:id', (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM students WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        } else {
            response.status(200).send({ "code": 200, message: "Deleted successfully" })
        }
    })
})

app.post('/students', (request, response) => {
    console.log("request", request.body)
    const { full_name, id, department, semester_no, current_cgpa, mobile_no, email, dob, gender, address, father_name, mother_name } = request.body

    pool.query('INSERT INTO students (full_name, id, department, semester_no, current_cgpa, mobile_no, email, dob, gender, address, father_name, mother_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)', [full_name, id, department, semester_no, current_cgpa, mobile_no, email, dob, gender, address, father_name, mother_name], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send({ "code": 200, message: "Saved successfully" })
    })
})

app.put('/update/:id', (request, response) => {
    const id = parseInt(request.params.id)
    const { full_name, department, semester_no, current_cgpa, mobile_no, email, dob, gender, address, father_name, mother_name } = request.body
console.log(id)
    pool.query(
        'UPDATE students SET full_name = $1, department = $2, semester_no = $3, current_cgpa = $4, mobile_no = $5, email = $6, dob = $7, gender = $8, address = $9, father_name = $10, mother_name = $11 WHERE id = $12', [full_name, department, semester_no, current_cgpa, mobile_no, email, dob, gender, address, father_name, mother_name, id], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send({message: `User modified with ID: ${id}`})
        })
})

app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})