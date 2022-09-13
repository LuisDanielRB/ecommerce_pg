const express = require('express');
const router = express.Router();
const {register, login, getUsers} = require('../controllers/users-controller')

router.post('/login', login )
router.post('/register' , register)
router.get('/users' , getUsers)


module.exports = router;