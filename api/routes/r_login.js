const db = require("../database")
const md5 = require("md5")
const jwt = require("jsonwebtoken")

module.exports = function(app) {
    app.post("/login", async (req, res) => {
        const user = await getUser(req.body.username, req.body.password)
        if (user === undefined) res.status(400)
        else {
            const { token } = generateJWT(user.username)
            db.query(`UPDATE user SET token = '${token}' WHERE username = '${user.username}'`, function(err, result) {
                if (err) throw err
                user.token = token
                res.send({ user })
            })
        }
    })
    
    function getUser(username, password) {
        return new Promise(resolve => {
            if (username === undefined || password === undefined) resolve(undefined)
            db.query(`SELECT * FROM user WHERE username LIKE "${username}" AND password LIKE "${md5(password)}"`, function(err, result) {
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