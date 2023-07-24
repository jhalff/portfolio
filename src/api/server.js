const express = require("express")
const path = require("path")
const md5 = require("md5")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 3000;
const db = require("./database")

app.set("view engine", "pug")
app.set("views", path.join(__dirname, "../pug"))
app.use("/img", express.static(path.join(__dirname, "../../public/img")))
app.use("/fonts", express.static(path.join(__dirname, "../../public/fonts")))

app.get("/", (req, res) => {
    res.render("site")
})

app.get("/cms", async (req, res) => {
    if (!req.query.username && !req.query.password) { res.render("login") }
    else {
        const user = await loginUser(req.query.username, req.query.password)
        if (user === undefined) res.render("login")
        else { 
            const { error, token } = generateJWT(req.query.username)
            db.query(`UPDATE user SET token = '${token}' WHERE username = '${req.query.username}'`, function(err, result) {
                if (err) throw err
                res.render("cms")
            })
        }
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

function generateJWT(username) {
    try {
        const payload = { username }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" })
        return { error: false, token }
    } catch (error) {
        return { error: true }
    }
}