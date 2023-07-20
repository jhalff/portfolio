const express = require("express")
const path = require("path")

const app = express()
const port = 3000

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../html/home.html"))
})

app.listen(port, () => console.log(`Server running on http://localhost:${port}`))