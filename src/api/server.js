const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 3000;

app.set("view engine", "pug")
app.set("views", path.join(__dirname, "../pug"))
app.use("/img", express.static(path.join(__dirname, "../../public/img")))
app.use("/fonts", express.static(path.join(__dirname, "../../public/fonts")))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.render("site")
})

app.get("/cms", async (req, res) => {
    if (!req.query.token) { return res.redirect("/cms/login") }
    else res.render("cms", { token: req.query.token, page: "dashboard" })
})

require("./routes/r_login")(app)
require("./routes/r_projects")(app)

app.listen(PORT, () => console.log(`Server: Running on http://localhost:${PORT}`))