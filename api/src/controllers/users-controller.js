const { Users , EventsCreated} = require('../db')
const jwt = require('jsonwebtoken')
const {tokenSign} = require ('../helpers/tokenSign')
const {compare , encrypt} = require('../helpers/handleByCrypt')
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
            //Comparo contraseña
            const checkPassword = await compare(password, findUser.password)

            //Token
            const tokenSession = await tokenSign(findUser)

            if(checkPassword) {
               res.cookie('jwt' , tokenSession , {httpOnly: true})
               res.json({user: findUser,token: tokenSession})
            }
            if(!checkPassword) {
                return res.status(404).send({ message: 'Password incorrect' })
            }

        } catch (error) {
            res.json({error: error})
        }


}

// Ruta Register
const register = async (req, res) => {
    const { name , email, password , address} = req.body
    
    try {
        let newPassword = await encrypt(password)
        const newUser = await Users.create({
                    name,
                    address,
                    password: newPassword,
                    email
                })
        const tokenSession = await tokenSign(newUser)
        res.cookie('jwt' , tokenSession , {httpOnly: true})
        res.json({
            user: newUser
        })
    } catch (error) {
        res.json({error: error})
    }
}

const getUsers = async (req, res) => {

    const allUsers = await Users.findAll()
    res.json(allUsers)
}


const logout = async (req, res) => {
    res.cookie('jwt' , '' , {maxAge: 1})
    res.redirect('/login')
}

module.exports = {
    register,
    login,
    getUsers,
    logout
}