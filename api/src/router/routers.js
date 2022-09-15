const express = require('express');
const router = express.Router();
const passport = require('passport');
const {register, login, getUsers , logout, upDateUser } = require('../controllers/users-controller')
const {createEvent, getEvents} = require('../controllers/events-controller')
const {fileUpload} = require('../helpers/fileUpload')


router.post('/login', login )
router.post('/register' , register)
router.get('/logout', logout)
router.put('/user/:id/profile', fileUpload, upDateUser)
router.post('/createEvent',  createEvent)
router.get('/users' , passport.authenticate('jwt-auth', { session: false }),getUsers)
router.post('/createEvent', createEvent)
router.get('/events' ,  getEvents)

module.exports = router;