const { Users , EventsCreated} = require('../db')
const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {tokenSign} = require ('../helpers/tokenSign')
const {compare , encrypt} = require('../helpers/handleByCrypt')
const authConfig = require('../config/auth')
const uploadImage = require('../helpers/cloudinary');
const fs = require('fs-extra');

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
                return res.json({
                    user: findUser,
                    token: tokenSession
                })
            }
            if(!checkPassword) {
                return res.status(404).send({ message: 'Password incorrect' })
            }

        } catch (error) {
            console.log(error)
            res.json({error: error})
        }


}

const upDateUser = async (req, res) => {
    const {id} = req.params;
    const {name, email, password, address} = req.body;
    var result;

    try {
        if(!id) res.status(404).json({message: 'id is require...'});

        let user = await Users.findOne({where:{id: id}});
        if(!user) res.status(404).json({message: 'user not found...'});
        
        if(req.files?.image){
            result = await uploadImage(req.files.image.tempFilePath);
            await Users.update({
                name, email, password, address, image: result.secure_url
            },{where:{id: id}});
            await fs.unlink(req.files.image.tempFilePath);
        }else{
            await Users.update({
                name, email, password, address
            },{where:{id: id}});
        }
        user = await Users.findOne({where:{id: id}});
        res.status(200).json(user);

    } catch (error) {
        console.log(error);
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
    verifyToken,
    upDateUser
}