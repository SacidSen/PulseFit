const express = require('express');
const router = express.Router();
const { register, login,logout} = require('../controllers/userController');
const User = require('../models/user'); // sadece test amaçlı route için lazım olabilir


router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;