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
    checkProjectsTable()
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

function checkProjectsTable() {
    const createProjectsTable = `CREATE TABLE IF NOT EXISTS projects (
        id int(11) NOT NULL AUTO_INCREMENT, 
        image_url VARCHAR(255),
        name VARCHAR(255),
        tags TEXT,
        description TEXT,
        PRIMARY KEY (id)
    )`

    db.query(createProjectsTable, function(err, result) {
        if (err) throw err

        db.query("SELECT * FROM projects", function(err, results) {
            if (err) throw err
            if(results.length > 0) return

            const createProject = `INSERT INTO projects (image_url, name, tags, description) VALUES (
                "/img/placeholder.png", 
                "My Project",
                "HTML, JS",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum faucibus magna non tempus."
            )`
            
            db.query(createProject, function(err, result) {
                if (err) throw err
                console.log("Database: First project added")
            }) 
        })
    }) 
}

module.exports = db