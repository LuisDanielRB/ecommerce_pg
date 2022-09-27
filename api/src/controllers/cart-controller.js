const { Cart, Users, Event, Cart_Events } = require('../db');


const getCart = async (req, res, next) => {
	let { userId } = req.query;
	try {
		let cartUser = await Cart.findOne({
			where: {
				userId,
				status: 'Active',
			},
			include: {
				model: Users,
				attributes: ['username', 'profile_picture', 'status'],
				model: Event,
				attributes: [
					'id',
					'description',
					'price',
					'artist',
					'image',
				],
				through: { attributes: ['amount'] },
			},
		});
		if (cartUser) res.status(200).json(cartUser);
		else res.status(400).send('No user was found with that ID');
	} catch (err) {
		next(err);
	}
};

const getAllCarts = async (req, res, next) => {
	let { userId } = req.query;
	try {
		let allCartsUser = await Cart.findAll({
			where: {
				userId,
			},
			include: {
				model: Event,
				attributes: ['id', 'description', 'price', 'artist'],
				through: { attributes: ['amount'] },
			},
		});
		if (allCartsUser)
			res.status(200).json(
				allCartsUser.slice(1)
			); //con slice(1) remuevo el primer elemento (osea el carrito activo porq no lo necesitamos en el front)
		else res.status(400).send('No user was found with that ID');
	} catch (err) {
		next(err);
	}
};

const addEventToCart = async (req, res, next) => {
	let { eventId, idUser } = req.body;
	console.log(req.body)
	try {
		let eventToAdd = await Event.findOne({where: {id: eventId}})
		if (!eventToAdd)
			return res.status(400).send('No event was found with that ID');

		let cart = await Cart.findOne({
			where: {
				userId: idUser,
				status: 'Active',
			},
			include: {
				model: Event,
			},
		});
		let newPrice = cart.totalPrice + eventToAdd.price 
		if (!cart)
			return res.status(400).send('No cart was found with that user ID');
		let repeatedEventCheck = cart.events.filter((e) => e.id === eventId);
		if (repeatedEventCheck.length > 0) {
			return res.status(400).send(`${eventToAdd.description} is already in the cart`)
		} else {
			await cart.addEvent(eventToAdd);
			await cart.update({
				totalPrice: newPrice,
			});
			return res.send(`${eventToAdd.description} added to cart!`);
		}
	} catch (err) {
		next(err);
	}
};

const removeOneEventFromCart = async (req, res, next) => {
	let { userId, eventId } = req.query;
	try {
		let eventToRemove = await Event.findOne({
			where: {
				id: eventId,
			},
		});

		if (!eventToRemove)
			return res.status(400).send('No event was found with that ID');

		let cart = await Cart.findOne({
			where: {
				userId: userId,
				status: 'Active',
			},
			include: {
				model: Event,
			},
		});

		let newPrice = cart.totalPrice - eventToRemove.price

		if (!cart) return res.status(400).send('No cart was found with that user ID');

		if (await cart.removeEvent(eventToRemove)) {
				await cart.update({
					totalPrice: newPrice,
				});
				return res.send(
					`All copies of ${eventToRemove.description} removed from cart`
				);
			} else
				return res.send(`No copies of ${eventToRemove.description} in cart!`);
		// }
	} catch (err) {
		next(err);
	}
}

const clearCart = async (req, res, next) => {
	let { userId } = req.query;
	try {
		let cart = await Cart.findOne({
			where: {
				userId,
				status: 'Active',
			},
			include: {
				model: Event,
			},
		});
		if (!cart)
			return res.status(400).send('No cart was found with that user ID');

		await cart.update({
			totalPrice: 0,
		});

		await cart.setEvents([]);
		res.status(200).send('Cart has been emptied');
	} catch (err) {
		next(err);
	}
};

const checkoutCart = async (req, res, next) => {
	let { userId } = req.body;
	try {
		let arrayPromises = [];
		let user = await Users.findByPk(userId);
		let oldCart = await Cart.findOne({
			where: {
				userId,
				status: 'Active',
			},
			include: {
				model: Event,
			},
		});
		if (oldCart.Event.length === 0)
			return res.status(400).send('Cart is empty');

		//RESTAMOS EL STOCK / CHECKEAMOS SI HAY STOCK
		let events = oldCart.Event.map((e) => e.id);
		let newStock = oldCart.Event.map(
			(e) => e.stock - e.Cart_Events.amount
		);
		if (!newStock.every((stock) => stock > -1))
			return res
				.status(400)
				.send('A event in the cart does not have enough stock');
		for (let i = 0; i < events.length; i++) {
			arrayPromises.push(
				Event.update(
					{
						stock: newStock[i],
					},
					{
						where: {
							id: events[i],
						},
					}
				)
			);
		}

		arrayPromises.push(
			Cart.update(
				{
					status: 'Disabled',
				},
				{
					where: {
						userId,
					},
				}
			)
		);

		let newCart = await Cart.create();
		arrayPromises.push(newCart.setUser(user));

		await Promise.all(arrayPromises);
		res.status(200).send(oldCart.id);
	} catch (err) {
		next(err);
	}
};



module.exports = {
	getCart,
	getAllCarts,
	addEventToCart,
	removeOneEventFromCart,
	clearCart,
	checkoutCart,
};