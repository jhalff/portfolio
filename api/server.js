const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT

app.use(cors({ origin: process.env.CLIENT_URL }))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

require("./routes/r_login")(app)
require("./routes/r_projects")(app)

app.listen(PORT, () => console.log(`Server: Running on http://localhost:${PORT}`))