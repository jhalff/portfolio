const express = require("express")
const path = require("path")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 3000;
const { db } = require("./database")

app.set("view engine", "pug")
app.set("views", path.join(__dirname, "../pug"))
app.use("/img", express.static(path.join(__dirname, "../../public/img")))
app.use("/fonts", express.static(path.join(__dirname, "../../public/fonts")))

app.get("/", (req, res) => {
    res.render("layout")
})

app.get("/admin", (req, res) => {
    res.render("admin")
})

app.listen(PORT, () => console.log(`Server: Running on http://localhost:${PORT}`))