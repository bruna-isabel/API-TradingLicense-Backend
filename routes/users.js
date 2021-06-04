const express = require('express');

const {getUsers,getUserById, createUser, updateUser, deleteUser} = require('../controllers/users.js');
const {login} = require('../controllers/auth.js');

const router = express.Router()

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
//router.post('/login', login)

module.exports = router;