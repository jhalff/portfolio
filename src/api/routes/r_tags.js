const db = require("../database")

module.exports = function(app) {
    app.get("/cms/tags", (req, res) => {
        if (!req.query.token) { res.redirect("/cms/login") }
        else res.render("cms", { token: req.query.token, page: "tags" })
    })
}