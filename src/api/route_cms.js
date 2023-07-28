const db = require("./database")
const md5 = require("md5")
const jwt = require("jsonwebtoken")

module.exports = function(app) {
    app.get("/cms", async (req, res) => {
        if (!req.query.token) { return res.redirect("/cms/login") }
        else res.render("cms", { token: req.query.token, page: "dashboard" })
    })

    app.get("/cms/login", (req, res) => {
        res.render("login")
    })
    app.post("/cms/login", async (req, res) => {
        const user = await getUser(req.body.username, req.body.password)
        if (user === undefined) return res.render("login")

        const { error, token } = generateJWT(user.username)
        db.query(`UPDATE user SET token = '${token}' WHERE username = '${user.username}'`, function(err, result) {
            if (err) throw err
            res.redirect(`/cms?token=${token}`)
        })
    })

    app.get("/cms/tags", (req, res) => {
        if (!req.query.token) { res.redirect("/cms/login") }
        else res.render("cms", { token: req.query.token, page: "tags" })
    })

    app.get("/cms/projects", (req, res) => {
        if (!req.query.token) { return res.redirect("/cms/login") }
        
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
    })


    // app.post("/cms/projects/edit", (req, res) => {
    //     let sql
    
    //     if (req.body.id === "0") {
    //         sql = `INSERT INTO projects (image_url, name, tags, description) 
    //             VALUES ('/img/placeholder.png', '${req.body.name}', '${req.body.tags}', '${req.body.description}')`
    //     }   
    
    //     // db.query(sql, function(err, result) {
    //     //     if (err) throw err
    //     //     res.redirect("/cms?")
    //     // })
    // })

    function getUser(username, password) {
        return new Promise(resolve => {
            if (username === undefined || password === undefined) resolve(undefined)
            db.query(`SELECT * FROM user WHERE username LIKE '${username}' AND password LIKE '${md5(password)}'`, function(err, result) {
                if (err) throw err
                resolve(result[0])
            })
        })
    }
    
    function generateJWT(username) {
        try {
            const payload = { username }
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" })
            return { error: false, token }
        } catch (error) {
            return { error: true }
        }
    }
}