const db = require("../database")
const md5 = require("md5")
const jwt = require("jsonwebtoken")

module.exports = function(app) {
    app.get("/projects", async (req, res) => {
        db.query("SELECT * FROM projects", function(err, results) {
            if (err) throw err
            res.send(results)
        })
    })
}