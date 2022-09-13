const { Users , EventsCreated} = require('../db')
const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')


// Ruta Login
const login = async (req, res) => {
    const {email, password} = req.body


        try {
            const findUser = await Users.findOne({
                where: {
                    email
                }
            })
            if(!findUser) {
               res.status(404).send({  message: 'User not found' })
            }
            if(bycrypt.compareSync(password, findUser.password)) {
                    findUser.rol = true
                    let token = jwt.sign( {user: findUser} , authConfig.secret , {expiresIn: authConfig.expires})
                    res.status(200).json({
                        user: findUser,
                        token: token
                    })
                } else {
                    return res.status(403).json({error: 'Invalid password'})   
                }
        } catch (error) {
            res.json({error: error})
        }


}

// Ruta Register
const register = async (req, res) => {
    const { name , email, password , address} = req.body
    
    try {
        let newPassword = bycrypt.hashSync(password, Number.parseInt((authConfig.rounds)))
        const newUser = await Users.create({
                    name,
                    address,
                    password: newPassword,
                    email
                })
        let token = jwt.sign( {user: newUser} , authConfig.secret , {expiresIn: authConfig.expires})
        res.json({
            user: newUser,
            token: token
        })
    } catch (error) {
        res.json({error: error})
    }
}

const getUsers = async (req, res) => {

    const allUsers = await Users.findAll()
    res.json(allUsers)
}



//Middle Authentication
const verifyToken = async (req, res, next) => {

    if(!req.headers.authorization) {
        return res.status(401).json({
            message: "No token provided"
        })
    }
    let token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, authConfig.secret , (err, decoded) => {
        if(err) {
            return res.status(401).json({
                message: "Invalid token"
            })
        }
        req.user = decoded.user;
        next();
    })  
}


module.exports = {
    register,
    login,
    getUsers,
    verifyToken
}