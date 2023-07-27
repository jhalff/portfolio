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

require("./route_cms")(app)

app.listen(PORT, () => console.log(`Server: Running on http://localhost:${PORT}`))