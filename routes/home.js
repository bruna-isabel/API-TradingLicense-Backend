// Listings Routes
const express = require('express');

const {getListings, getListingById, createListing, updateListing, deleteListing} = require('../controllers/listings.js');

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello World')
})

module.exports = router;