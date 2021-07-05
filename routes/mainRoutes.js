// Listings Routes
const express = require('express');
const { authenticateToken, authRole } = require('../controllers/auth');
const router = express.Router()


router.get('/home', (req, res) => {
    res.send('Hello World')
})

router.get('/admin',  authenticateToken, authRole(2), (req, res) => {
    res.send('admin page')
})

router.get('/dashboard', authenticateToken, (req, res) => {
    res.send('DashBoard page')
})

module.exports = router;