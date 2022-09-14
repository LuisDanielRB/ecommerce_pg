const { verifyToken } = require('../helpers/tokenSign')

const checkAuth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        const tokenData = await verifyToken(token)
        if (tokenData) {
            next()
        } else {
            res.status(409)
            res.send({ error: 'Tu por aqui no pasas!' })
        }

    } catch (e) {
        res.status(409)
        res.send({ error: e })
    }

}

module.exports = checkAuth