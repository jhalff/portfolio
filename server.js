const express = require("express")
const path = require("path")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 3000;

app.set("view engine", "pug")
app.set("views", path.join(__dirname, "src/pug"))
app.use("/img", express.static(path.join(__dirname, "public/img")))

app.get("/", (req, res) => {
    res.render("layout")
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))