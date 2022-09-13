const { Users , EventsCreated} = require('../db')
const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')


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

const register = async (req, res) => {
    const { name , email, password , address, rol} = req.body
    
    try {
        let newPassword = bycrypt.hashSync(password, Number.parseInt((authConfig.rounds)))
        const newUser = await Users.create({
                    name,
                    address,
                    password: newPassword,
                    email,
                    rol
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


module.exports = {
    register,
    login,
    getUsers
}