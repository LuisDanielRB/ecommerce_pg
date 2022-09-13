const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth')

const tokenSign = async (user) => {
    return jwt.sign(
        {
        id: user.id, 
        role: user.role
        },
        authConfig.secret,
        {
        expiresIn: authConfig.expires
        }
        )
}

const verifyToken = async (token) => {
    try {
        return jwt.verify(token, authConfig.secret)
    } catch (e) {
        return null
    }
}

const decodeSign = async (token) => {
    return jwt.decode(token, null)
}

module.exports = { tokenSign, decodeSign, verifyToken }