const mysql = require("mysql")
const md5 = require("md5")
require("dotenv").config()

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

db.connect(function(err) {
    if (err) throw err
    checkUserTable()
})

function checkUserTable() {
    const createUserTable = `CREATE TABLE IF NOT EXISTS user (
        username VARCHAR(5), 
        password VARCHAR(32),
        token TEXT
    )`

    db.query(createUserTable, function(err, result) {
        if (err) throw err

        db.query("SELECT * FROM user", function(err, result) {
            if (err) throw err
            if(result.length > 0) return

            const password = md5(process.env.LOGIN_PASSWORD)
            const createUser = `INSERT INTO user (username, password) VALUES ('${process.env.LOGIN_USERNAME}', '${password}')`
            
            db.query(createUser, function(err, result) {
                if (err) throw err
                console.log("Database: Main user added")
            }) 
        })
    }) 
}

module.exports = db