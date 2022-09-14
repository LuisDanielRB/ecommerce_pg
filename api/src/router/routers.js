const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/auth')
const checkRoleAuth = require('../middleware/role')
const {register, login, getUsers , logout } = require('../controllers/users-controller')
const {createEvent, getEvents} = require('../controllers/events-controller')

// checkAuth, checkRoleAuth(['user']) 
router.post('/login', login )
router.post('/register' , register)
router.get('/logout', logout)
router.post('/createEvent', checkAuth , createEvent)
router.get('/users' , checkAuth, getUsers)
router.post('/createEvent', createEvent)
router.get('/events' , checkAuth , getEvents)

module.exports = router;