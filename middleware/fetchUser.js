const jwt = require('jsonwebtoken')
const JWT_SECRET = 'ashar.2day'

const fetchUser = async (req, res, next) => {
    try {

        const token = req.header('auth-token')
        const data = await jwt.verify(token, JWT_SECRET)
        req.user = data
        next();

    } catch (error) {
        console.error(error.message)
        res.status(401).json({ error: "YOU ARE NOT ALLOWED" })
    }
}

module.exports = fetchUser