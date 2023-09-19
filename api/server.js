const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const db = require("./database")
const md5 = require("md5")

require("dotenv").config()

const app = express()
const PORT = process.env.PORT

app.use(cors({ origin: process.env.CLIENT_URL }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/login", async (req, res) => {
    const user = await getUser(req.body.username, req.body.password)
    res.send({ user })
})

function getUser(username, password) {
    return new Promise(resolve => {
        if (username === undefined || password === undefined) resolve(undefined)
        db.query(`SELECT * FROM user WHERE username LIKE "${username}" AND password LIKE "${md5(password)}"`, function(err, result) {
            if (err) throw err
            resolve(result[0])
        })
    })
}

app.listen(PORT, () => console.log(`Server: Running on http://localhost:${PORT}`))