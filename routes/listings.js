// Listings Routes
const express = require('express');
const {getListings, getListingById, createListing, updateListing, deleteListing} = require('../controllers/listings.js');

const router = express.Router()

router.get('/', getListings);
router.post('/', createListing);
router.get('/:id', getListingById);
router.put('/:id', updateListing);
router.delete('/:id', deleteListing);

module.exports = router;