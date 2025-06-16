const express = require('express');
const router = express.Router();
const { register, login,logout, getMe} = require('../controllers/userController');
const User = require('../models/user'); 


router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', getMe);

module.exports = router;