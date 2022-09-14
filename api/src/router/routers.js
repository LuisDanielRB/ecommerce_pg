const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/auth')
const checkRoleAuth = require('../middleware/role')
const {register, login, getUsers , verifyToken} = require('../controllers/users-controller')
const {createEvent} = require('../controllers/events-controller')

router.post('/login', login )
router.post('/register' , register)
router.post('/createEvent', createEvent)
router.get('/users' , checkAuth, checkRoleAuth(['user']) , getUsers)

module.exports = router;