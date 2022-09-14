const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/auth')
const checkRoleAuth = require('../middleware/role')
const {register, login, getUsers } = require('../controllers/users-controller')
const {createEvent, getEvents} = require('../controllers/events-controller')


router.post('/login', login )
router.post('/register' , register)
router.post('/createEvent', createEvent)
router.get('/users' , checkAuth, checkRoleAuth(['user']) , getUsers)
router.post('/createEvent', createEvent)
router.get('/events' , getEvents)

module.exports = router;