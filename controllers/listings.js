// Listings Controller
const listingsModel = require('../models/listings');

const getListings = async (req, res) => {
    res.send('Get Listings')
};

const createListing = async (req, res) => {
    res.send('Create Listings')
};

const getListingById = async (req, res) => {
    res.send('Get Listings by ID')
};

const updateListing = async (req, res) => {
    res.send('Update Listings')
};

const deleteListing = async (req, res) => {
    res.send('Delete listings')
};

module.exports = {
    getListings, 
    createListing,
    getListingById,
    updateListing,
    deleteListing
}

