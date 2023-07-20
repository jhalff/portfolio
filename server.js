const express = require("express")
const path = require("path")

const app = express()
const port = 3000

app.set("view engine", "pug")
app.set("views", path.join(__dirname, "views"))

app.get("/", (req, res) => {
    res.render("layout")
})

app.listen(port, () => console.log(`Server running on http://localhost:${port}`))