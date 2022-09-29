const { Users , Event , Cart} = require('../db')
const jwt = require('jsonwebtoken')
const {compare , encrypt} = require('../helpers/handleByCrypt')
const authConfig = require('../config/auth')
const {uploadImage, deleteImage} = require('../helpers/cloudinary');
const fsExtra = require('fs-extra');
//EMAIL CONFIRMATION
const { sendMailWelcome } = require('./email-controller');

// Ruta Login
const login = async (req, res , next) => {
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
				profile_picture: userCheck.profile_picture,
				favorites: userCheck.favorites,
			});

		}
	} catch (e) {
		next(e);
	}


}

const upDateUser = async (req, res) => {
    const {id} = req.params;
    const {username , email, password , status} = req.body;
    var result;

    try {
        if(!id) res.status(404).json({message: 'id is require...'});

        let user = await Users.findOne({where:{id: id}});
        if(!user) res.status(404).json({message: 'user not found...'});
        
		if(username) await Users.update({username},{where:{id: id}});
		if(email) await Users.update({email},{where:{id: id}});
		if(password) await Users.update({password},{where:{id: id}});
		if(status) await Users.update({status},{where:{id: id}});


        if(req.files?.image){
            if(!user.imageId){
				result = await uploadImage(req.files.image.tempFilePath);
				await Users.update({profile_picture: result.secure_url,
									profile_picture_id: result.public_id},
									{where:{id: id}});
				await fsExtra.unlink(req.files.image.tempFilePath);
			}else{
				await deleteImage(user.imageId);
				result = await uploadImage(req.files.image.tempFilePath);
				await Users.update({profile_picture: result.secure_url,
									profile_picture_id: result.public_id},
									{where:{id: id}});
				await fsExtra.unlink(req.files.image.tempFilePath);
			}
        }

        user = await Users.findOne({where:{id: id}});
        res.status(200).json(user);

    } catch (error) {
        console.log(error);
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
        sendMailWelcome(username, email)
		let cartToAssociate = await Cart.create();
		await cartToAssociate.setUser(newUser);
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

const googleSignIn = async (req, res, next) => {
	const { username, email, profile_picture, password } = req.body;
	try {
		const alreadyExists = await Users.findOne({ where: { email: email } });
		if (alreadyExists) {
			const jwtToken = jwt.sign(
				{
					//token creation
					id: alreadyExists.id,
					email: alreadyExists.email,
					status: 'User',
				},
				authConfig.secret,
				{ expiresIn: '12h' }
			);

			res.status(200).json({
				token: jwtToken,
				status: 'User',
				id: alreadyExists.id,
				email: alreadyExists.email,
				username: alreadyExists.username,
				profile_picture: profile_picture,
				favorites: alreadyExists.favorites,
			});
		}
		if (!alreadyExists) {
			const create = await Users.create({
				email: email,
				username: username,
				profile_picture: profile_picture,
				password
			});
			const jwtToken = jwt.sign(
				{
					//token creation
					id: create.id,
					email: create.email,
					status: create.status,
				},
				authConfig.secret,
				{ expiresIn: '12h' }
			);
			//AQUÍ EJECUTO LA FUNCIÓN DEL CORREO
			sendMailWelcome(username, email)
			let cartToAssociate = await Cart.create();
			await cartToAssociate.setUser(create);
			res.status(200).json({
				token: jwtToken,
				status: create.status,
				id: create.id,
				email: create.email,
				username: create.username,
				profile_picture: create.profile_picture,
				favorites: create.favorites,
			});
			
		}
	} catch (e) {
		console.log(e);
		next(e);
	}
};



// LOGICA PARA FAVORITOS
const addFavorite = async (req, res) => {
	let { idUser, idEvent } = req.body;
	console.log(req.body);
	try {
		let user = await Users.findByPk(idUser)
		console.log(user);
		if (user) {
			let newArray = user.favorites;
			if (!newArray.includes(idEvent)) {
				newArray.push(idEvent);
			} else {
				throw new Error('Invalid id');
			}

			await Users.upsert({
				id: user.id,
				email: user.email,
				password: user.password,
				username: user.username,
				profile_picture: user.profile_picture,
				status: user.status,
				favorites: newArray,
			});

			return res.send('Added id');
		} else {
			throw new Error('Invalid user');
		}
	} catch (error) {
		res.status(400).json(error.message);
	}
};

const deleteFavorite = async (req, res) => {
	let { idUser, idEvent } = req.body;

	try {
		let user = await Users.findByPk(idUser);

		if (user) {
			let newArray = user.favorites;
			if (newArray.includes(idEvent)) {
				newArray = newArray.filter((e) => e !== idEvent);
			} else {
				throw new Error('Invalid id');
			}

			await Users.upsert({
				id: user.id,
				email: user.email,
				password: user.password,
				username: user.username,
				profile_picture: user.profile_picture,
				status: user.status,
				favorites: newArray,
			});

			res.send('Id removed');
		} else {
			throw new Error('Invalid user');
		}
	} catch (error) {
		res.status(400).json(error.message);
	}
};

const getFavorite = async (req, res) => {
	let { idUser } = req.params;

	try {
		let user = await Users.findByPk(idUser);

		if (user) {
			let response = user.favorites;
			res.send(response);
		} else {
			throw new Error('Invalid user');
		}
	} catch (error) {
		res.status(400).json(error.message);
	}
};

const resetPassword = async (req, res, next) => {
	let { userId, password } = req.body;
	try {
		let user = await Users.findOne({
			where: {
				id: userId,
			},
		});

		if (!user)
			return res.status(400).send('User has not been found with that ID');


			const checkPassword = await compare(password, user.password)

		if (!checkPassword) return res.status(400).send('Password does not match!');

		await Users.update(
			{
				password: checkPassword,
			},
			{
				where: {
					id: userId,
				},
			}
		);

		res.send(`User ${user.username} has updated their password`);
	} catch (err) {
		next(err);
	}
};



module.exports = {
    register,
    login,
    getUsers,
	upDateUser,
	googleSignIn,
	addFavorite,
	deleteFavorite,
	getFavorite,
	// bannedUser,
	resetPassword
}