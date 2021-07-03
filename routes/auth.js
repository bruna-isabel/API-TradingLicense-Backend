const express = require('express');
const {login, signup} = require('../controllers/auth.js');
const router = express.Router()
const {validateUser} = require('../controllers/validation');


router.post('/login', login);
router.post('/signup', signup, validateUser)

module.exports = router;


