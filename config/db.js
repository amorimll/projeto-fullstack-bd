const mysql = require('mysql2')
require("dotenv").config()

let host = 'localhost'
let user = 'root'
let database = "fullstack-app"
let password = "135790asdf"

const pool = mysql.createPool({
    host: host,
    user: user,
    database: database,
    password: password,
})

module.exports = pool.promise();