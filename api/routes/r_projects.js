const db = require("../database")
const fs = require("fs")
const multer  = require("multer")
const storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, "../public/uploads") },
    filename: function ( req, file, cb ) { cb(null, "new-upload.png") }
})
const upload = multer({ storage: storage })

module.exports = function(app) {
    app.get("/projects", async (req, res) => {
        db.query("SELECT * FROM projects", function(err, results) {
            if (err) throw err
            res.send(results)
        })
    })

    app.post("/projects/edit", upload.single("thumbnail_file"), async (req, res) => {
        if (!req.query.token || !req.query.id) return res.sendStatus(400)
        const tokenIsValid = await findUserByToken(req.query.token)
        if (!tokenIsValid) return res.sendStatus(400)

        let thumbnailFileUrl = req.body.thumbnail_url
        const thumbnailFileName = `project-${req.query.id}-thumbnail.png`
        if (req.file !== undefined) {
            const newimagePath = `../public/uploads/${thumbnailFileName}`
            thumbnailFileUrl = `/uploads/${thumbnailFileName}`
            fs.renameSync("../public/uploads/new-upload.png", newimagePath)
        }

        let sqlQuery = ""
        if (req.query.id > 0) {
            sqlQuery = `
                UPDATE projects SET 
                    name = '${req.body.name}', 
                    categories = '${req.body.categories}', 
                    description = '${req.body.description}',
                    thumbnail_url = '${thumbnailFileUrl}'
                WHERE id = ${req.query.id}`
        } else {
            sqlQuery = `
                INSERT INTO projects (name, categories, description, thumbnail_url) 
                    VALUES('${req.body.name}', '${req.body.categories}', '${req.body.description}', '${thumbnailFileUrl}')`
        }

        db.query(sqlQuery, function(err, result) {
            if (err) throw err
            res.send(true)
        })
    })

    app.delete("/projects/delete", async (req, res) => {
        if (!req.query.token || !req.query.id) return res.sendStatus(400)
        const tokenIsValid = await findUserByToken(req.query.token)
        if (!tokenIsValid) return res.sendStatus(400)

        db.query(`DELETE FROM projects WHERE id = ${req.query.id}`, function(err, result) {
            if (err) throw err
            res.send(true)
        })
    })

    function findUserByToken(token) {
        return new Promise(resolve => {
            db.query(`SELECT * FROM user WHERE token LIKE "${token}"`, function(err, result) {
                if (err) throw err
                if (result[0] !== undefined) resolve(true)
                else resolve(false)
            })
        })
    }
}