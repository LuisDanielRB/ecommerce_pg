const { Users , Cart , ReviewScore} = require("../db");
const { Op } = require('sequelize');


const adminDelete = async (req, res) => {

}

const adminPut = async (req, res) => {
    const { idUser, idAdmin } = req.query
    const {status} = req.body

    const mStatus = status.charAt(0).toUpperCase() + status.slice(1);

    try {

        const validation = await Users.findOne({
            where: {
                id: idAdmin
            }
        })

        if (validation.status !== 'Admin') return res.json("You are not an admin")
       
        await Users.update({
            status: mStatus
        }, { where: { id: idUser } })

        const user = await Users.findOne({
            where: {
                id: idUser
            }
        })
        res.send(`${user.username} is now ${user.status}`)
    } catch (error) {
        console.log(error)
    }
}


// Update to joaco , hay que revisar  si anda bien
const getAllOrders = async (req, res, next) => {
	try {
		let allOrders = await Cart.findAll({
			where: {
				status: {
					[Op.not]: 'Active',
				},
			},
			include: {
				model: Event,
			},
		});
		res.json(allOrders);
	} catch (err) {
		next(err);
	}
};

const banUser = async (req, res, next) => {
	let { userId } = req.body;
	try {
		let userToBan = await Users.findOne({
			where: {
				id: userId,
			},
		});
		if (userToBan) {
			await userToBan.update({
				status: 'Banned',
			});
			ReviewScore.destroy({
				where: {
					userId,
				},
			});
			res.status(200).send(`User ${userToBan.username} has been banned!`);
		} else {
			res.status(400).send('No user was found with that id');
		}
	} catch (e) {
		next(e);
	}
};

const unbanUser = async (req, res, next) => {
	let { userId } = req.body;
	try {
		let userToUnban = await Users.findOne({
			where: {
				id: userId,
			},
		});
		if (userToUnban) {
			await userToUnban.update({
				status: 'User',
			});
			let unbanned = await Users.findByPk(userId);
			res.status(200).send(unbanned);
		} else {
			res.status(400).send('No user was found with that id');
		}
	} catch (e) {
		next(e);
	}
};

const upgradeToAdmin = async (req, res, next) => {
	let { userId } = req.body;
	try {
		let userToAdmin = await Users.findOne({
			where: {
				id: userId,
			},
		});
		if (userToAdmin) {
			await userToAdmin.update({
				status: 'Admin',
			});
			res.status(200).send(
				`User ${userToAdmin.username} has been upgraded to admin!`
			);
		} else {
			res.status(400).send('No user was found with that id');
		}
	} catch (e) {
		next(e);
	}
};

const deleteCommentToAdmin = async (req, res, next) => {
	let { reviewId } = req.body;
	try {
		await ReviewScore.destroy({
			where: {
				id: reviewId,
			},
		});
		res.send(`Comment has been deleted`);
	} catch (err) {
		next(err);
	}
};

module.exports = {
    adminDelete,
    adminPut
};