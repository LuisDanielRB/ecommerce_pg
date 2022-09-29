const express = require("express");
const router = express.Router();
const {mercadopagoPayment} = require('../controllers/payments-controller')
const {register, login, getUsers , addFavorite, upDateUser, googleSignIn  , deleteFavorite , getFavorite, bannedUser} = require('../controllers/users-controller')
const {createEvent, getEvents, getEventDetail , getEventsDetailDb, deleteEvents , updateEvent} = require('../controllers/events-controller')
const {getCart,getAllCarts,addEventToCart,removeOneEventFromCart,clearCart,checkoutCart} = require('../controllers/cart-controller')
const {fileUpload} = require('../helpers/fileUpload')
const passport = require("passport");
const {getReviewScore, postReviewScore, putReviewScore, deleteReviewScore} = require('../controllers/reviewScore-controller')


router.post("/user/google", googleSignIn);
router.post("/login", login);
router.post("/register", register);
router.put("/user/:id/profile", fileUpload, upDateUser);
router.put("/user/:id/banned", bannedUser);
router.post("/createEvent", fileUpload, createEvent);
router.post("/event/:id/update", fileUpload, updateEvent);
router.get("/users", getUsers);
router.get("/events", getEvents);
router.get("/eventsCreate/:id", getEventDetail);
router.delete("/events/:id", deleteEvents);
router.get("/eventsDB/:id", getEventsDetailDb);
router.put('/favorites', addFavorite);
router.delete('/favorites', deleteFavorite);
router.get('/favorites/:idUser', getFavorite);
router.get('/reviewScore/:eventId', getReviewScore);
router.post('/reviewScore/:eventId', postReviewScore);
router.put('/reviewScore/:eventId', putReviewScore);
router.delete('/reviewScore/:eventId', deleteReviewScore)

//Cart 
router.get('/cart', getCart);
router.get('/allcart', getAllCarts);
router.post('/addcart', addEventToCart);
router.put('/deleteeventcart', removeOneEventFromCart);
router.put('/clearcart', clearCart);
router.put("/payment", checkoutCart , mercadopagoPayment);

module.exports = router;





