const md5 = require("md5")
require("dotenv").config()

const feedUserTable = (db) => {
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

const feedProjectsTable = (db) => {
    const createProjectsTable = `CREATE TABLE IF NOT EXISTS projects (
        id int(11) NOT NULL AUTO_INCREMENT, 
        thumbnail_url VARCHAR(255),
        name VARCHAR(255),
        categories TEXT,
        description TEXT,
        PRIMARY KEY (id)
    )`

    db.query(createProjectsTable, function(err, result) {
        if (err) throw err

        db.query("SELECT * FROM projects", function(err, results) {
            if (err) throw err
            if(results.length > 0) return

            const createProject = `INSERT INTO projects (thumbnail_url, name, categories, description) VALUES (
                "/img/placeholder.png", 
                "My Project",
                "html, js",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum faucibus magna non tempus."
            )`
            
            db.query(createProject, function(err, result) {
                if (err) throw err
                console.log("Database: First project added")
            }) 
        })
    }) 
}

module.exports = { feedUserTable, feedProjectsTable }