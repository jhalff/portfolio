const db = require("../database")

module.exports = function(app) {
    app.get("/cms/projects", (req, res) => {
        if (!req.query.token) { return res.redirect("/") }

        if (req.query.id) {
            db.query(`SELECT * FROM projects WHERE id = ${req.query.id}`, function(err, results) {
                if (err) throw err
                if (results.length > 0) res.send(results[0])
                else res.send({ no_results: true })
            })
        }
        else {
            db.query("SELECT * FROM projects", function(err, results) {
                if (err) throw err
    
                let data = []            
                results.forEach(project => {
                    data.push(project)
                })
    
                res.render("cms", { 
                    token: req.query.token, 
                    page: "projects",
                    data: data
                })
            })
        }
    })

    app.get("/cms/projects/delete", (req, res) => {
        if (!req.query.token) { return res.redirect("/") }

        db.query(`DELETE FROM projects WHERE id = ${req.query.id}`, function(err, result) {
            if (err) throw err
            res.redirect(req.get("referer"))
        }) 
    })


    app.post("/cms/projects/edit", (req, res) => {
        let sql = ""
    
        if (req.body.id === "0") {
            sql = `INSERT INTO projects (image_url, name, tags, description) 
                VALUES ('/img/placeholder.png', '${req.body.name}', '${req.body.tags}', '${req.body.description}')`
        }   
        else {
            sql = `UPDATE projects SET 
                name = '${req.body.name}', 
                tags = '${req.body.tags}',
                description = '${req.body.description}'
                WHERE id = ${req.body.id}`
        }
    
        db.query(sql, function(err, result) {
            if (err) throw err
            res.redirect(req.get("referer"))
        })
    })
}