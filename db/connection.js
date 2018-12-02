const mysql = require('mysql2')

const credentials = {
    host: 'localhost',
    user: 'root',
    database: "sql-run",
    password: 'password'
}
const pool = mysql.createPool(credentials)

module.exports = pool.promise()