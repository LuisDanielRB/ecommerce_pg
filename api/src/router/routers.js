const express = require("express");
const router = express.Router();
const {mercadopagoPayment} = require('../controllers/payments-controller')
const {register, login, getUsers , addFavorite, upDateUser, googleSignIn  , deleteFavorite , getFavorite} = require('../controllers/users-controller')
const {createEvent, getEvents, getEventDetail , getEventsDetailDb, deleteEvents , updateEvent} = require('../controllers/events-controller')
const {fileUpload} = require('../helpers/fileUpload')
const passport = require("passport");


router.post("/user/google", googleSignIn);
router.post("/login", login);
router.post("/register", register);
router.put("/user/:id/profile", fileUpload, upDateUser);
router.post("/createEvent", fileUpload, createEvent);
router.post("/event/:id/update", fileUpload, updateEvent);
router.get("/users", getUsers);
router.get("/events", getEvents);
router.get("/eventsCreate/:id", getEventDetail);
router.post("/payment", mercadopagoPayment);
router.delete("/events/:id", deleteEvents);
router.get("/eventsDB/:id", getEventsDetailDb);
router.put('/favorites', addFavorite);
router.delete('/favorites', deleteFavorite);
router.get('/favorites/:idUser', getFavorite);


module.exports = router;





