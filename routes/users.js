const express = require('express');
const {getUsers,getUserById, createUser, updateUser, deleteUser} = require('../controllers/users.js');
const {login} = require('../controllers/auth.js');
const {validateUser} = require('../controllers/validation');


const router = express.Router()

router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
//router.post('/login', login)

module.exports = router;