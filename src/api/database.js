const mysql = require("mysql")
require("dotenv").config()

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

db.connect(function(err) {
    if (err) throw err

    const createUserTable = "CREATE TABLE IF NOT EXISTS user (username VARCHAR(5), password VARCHAR(32))"
    db.query(createUserTable, function(err, result) {
        if (err) throw err

        db.query("SELECT * FROM user", function(err, result) {
            if (err) throw err
            if(result.length > 0) return

            const username = "admin"
            const createUser = `INSERT INTO user (username) VALUES ('admin')`
            db.query(createUser, function(err, result) {
                if (err) throw err
                console.log("Database: User 'admin' added")
            }) 
        })
    }) 

    const createProjectsTable = "CREATE TABLE IF NOT EXISTS projects (id INT PRIMARY KEY, name VARCHAR(255))"
    db.query(createProjectsTable, function(err, result) {
        if (err) throw err
    }) 
})

module.exports = db