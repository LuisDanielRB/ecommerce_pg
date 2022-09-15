const { Users , EventsCreated} = require('../db')
const jwt = require('jsonwebtoken')
const {compare , encrypt} = require('../helpers/handleByCrypt')
const authConfig = require('../config/auth')


// Ruta Login
const login = async (req, res , next) => {
	console.log(req.body)
    const { email, password } = req.body;
	try {
            let userCheck = await Users.findOne({
                where: {
                    email
                },
            });
            
        if (!userCheck) return res.status(400).send('User not found');

        const checkPassword = await compare(password, userCheck.password)

		if (!checkPassword)
			return res.status(400).send('Password does not match!');
		else if (
			userCheck.email !== email
		)
			return res.status(400).send('Username does not match!');
		else {
			const jwtToken = jwt.sign(
				{
					//token creation
					id: userCheck.id,
					email: userCheck.email,
					status: userCheck.status,
				},
				authConfig.secret,
				{ expiresIn: '12h' }
			);
			res.status(200).json({
				token: jwtToken,
				status: userCheck.status,
				id: userCheck.id,
				email: userCheck.email,
				username: userCheck.username,
				profile_picture: userCheck.profile_picture
			});
		}
	} catch (e) {
		next(e);
	}


}

// Ruta Register
const register = async (req, res , next) => {

    const { username , email, password , status } = req.body
    
    try {
        const alreadyExistsMail = await Users.findAll({
			where: { email: email },
		});

		if (alreadyExistsMail.length) {
			console.log('Email already registered');
			res.status(400).send('Email already registered');
			return;
		}
		const alreadyExistsUsername = await Users.findAll({
			where: { username: username },
		});

		if (alreadyExistsUsername.length) {
			console.log('Username already registered');
			res.status(400).send('Username already registered');
			return;
		}

		let newPassword = await encrypt(password)

		const newUser = await Users.create({
			email: email,
			password: newPassword,
			username: username,
			status: status,
			profile_picture:
				'https://media.istockphoto.com/vectors/man-reading-book-and-question-marks-vector-id1146072534?k=20&m=1146072534&s=612x612&w=0&h=sMqSGvSjf4rg1IjZD-6iHEJxHDHOw3ior1ZRmc-E1YQ=',
		});
        
		res.json({
			message: 'User created succesfully!',
			id: newUser.id,
			email: newUser.email,
		});
	} catch (err) {
		next(err);
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