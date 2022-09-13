const { verifyToken } = require('../helpers/tokenSign')
const { Users } = require('../db')

const checkRoleAuth = (roles) => async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const tokenData = await verifyToken(token)
        const userData = await Users.findByPk(tokenData.id) //TODO: 696966
        console.log(userData)
        
        //['user'].includes('user')
        if ([].concat(roles).includes(userData.rol)) { //TODO:
            next()
        } else {
            res.status(409)
            res.send({ error: 'No tienes permisos' })
        }

    } catch (e) {
        console.log(e)
        res.status(409)
        res.send({ error: 'Tu por aqui no pasas!' })
    }

}

module.exports = checkRoleAuth