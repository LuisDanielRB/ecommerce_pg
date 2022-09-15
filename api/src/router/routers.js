const express = require('express');
const router = express.Router();
const passport = require('passport');
const {register, login, getUsers , logout } = require('../controllers/users-controller')
const {createEvent, getEvents} = require('../controllers/events-controller')



router.post('/login', login )
router.post('/register' , register)
router.get('/logout', logout)
router.post('/createEvent',  createEvent)
router.get('/users' , passport.authenticate('jwt-auth', { session: false }),getUsers)
router.post('/createEvent', createEvent)
router.get('/events' ,  getEvents)

module.exports = router;