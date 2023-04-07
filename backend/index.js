const db_args = require('./keys')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql')

const app = express()
app.use(cors())
app.use(bodyParser.json())

const connection = mysql.createConnection({
    host: db_args.host,
    user: db_args.user,
    password: db_args.password,
    database: db_args.dbname,
    port: db_args.port
})

var del = connection._protocol._delegateError;
connection._protocol._delegateError = function(err, sequence){
  if (err.fatal) {
    console.trace('fatal error: ' + err.message);
  }
  return del.call(this, err, sequence);
};

app.get('/students', (req, res) => {
    console.log("Server got a \"GET\" request for student ALARM ALARM ALARM!!!")
    connection.query('SELECT * FROM students', (error, response) => {
        if (error) {
            res.status(500).send("DB ERROR" + error.message)
        } else {
            res.send(response)
        }
    })
})

app.post('/students', (req, res) => {
    const { name , description } = req.body
    connection.query('INSERT INTO students (name, description) VALUES (?, ?)',
        [name, description], (error, response) => {
            if (error) {
                res.status(500).send(error.message)
            } else {
                res.send(response)
            }
        }
    )
})

app.listen(8088, () => {
    console.log('server working and listenning on 8080')
})