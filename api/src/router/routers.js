const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/auth')
const checkRoleAuth = require('../middleware/role')
const {register, login, getUsers, upDateUser } = require('../controllers/users-controller')
const {createEvent, getEvents} = require('../controllers/events-controller')
const imageUpload = require('../helpers/fileUpload');

router.post('/login', login )
router.post('/register',register)
router.get('/users' , checkAuth, checkRoleAuth(['user']) , getUsers)
router.post('/createEvent', createEvent)
router.get('/events' , getEvents)
router.put('/user/:id/profile', imageUpload.fileUpload, upDateUser);

module.exports = router;