const express = require("express")
const path = require("path")
const md5 = require("md5")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 3000;
const db = require("./database")

app.set("view engine", "pug")
app.set("views", path.join(__dirname, "../pug"))
app.use("/img", express.static(path.join(__dirname, "../../public/img")))
app.use("/fonts", express.static(path.join(__dirname, "../../public/fonts")))

app.get("/", (req, res) => {
    res.render("layout")
})

app.get("/admin", async (req, res) => {
    if (!req.query.username && !req.query.password) {
        res.render("login")
    }
    else {
        const user = await loginUser(req.query.username, req.query.password)
        if (user === undefined) res.render("login")
        else res.render("admin")
    }
})

app.listen(PORT, () => console.log(`Server: Running on http://localhost:${PORT}`))

function loginUser(username, password) {
    return new Promise(resolve => {
        db.query(`SELECT * FROM user WHERE username LIKE '${username}' AND password LIKE '${md5(password)}'`, function(err, result) {
            if (err) throw err
            resolve(result[0])
        })
    })
}