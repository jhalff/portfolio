const mysql = require("mysql")
require("dotenv").config()

const { feedUserTable, feedProjectsTable } = require("./data-factory") 

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

db.connect(function(err) {
    if (err) throw err
    if (process.env.ENABLE_DATA_FACTORY) {
        feedUserTable(db)
        feedProjectsTable(db)
    }
})

module.exports = db