const express = require("express");
const router = express.Router();
const {mercadopagoPayment} = require('../controllers/payments-controller')
const {register, login, getUsers , logout, upDateUser, googleSignIn, bannedUser} = require('../controllers/users-controller')
const {createEvent, getEvents, getEventDetail , getEventsDetailDb, deleteEvents , getEventsForUsers, updateEvent} = require('../controllers/events-controller')
const {fileUpload} = require('../helpers/fileUpload')
const passport = require("passport");


router.post("/user/google", googleSignIn);
router.post("/login", login);
router.post("/register", register);
router.get("/logout", logout);
router.put("/user/:id/profile", fileUpload, upDateUser);
router.put("/user/:id/banned", bannedUser);
router.post("/createEvent", fileUpload, createEvent);
router.post("/event/:id/update", fileUpload, updateEvent);
router.get("/users", getUsers);
router.get("/events", getEvents);
router.get("/eventsCreate/:id", getEventDetail);
router.post("/payment", mercadopagoPayment);
router.delete("/events/:id", deleteEvents);
router.get("/eventsDB/:id", getEventsDetailDb);




module.exports = router;





