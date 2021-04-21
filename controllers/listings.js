// Listings Controller
const { userInfo } = require('os');
const { Listing } = require('../models');

exports.getListings = async (req, res) => {
        Listing.findAll()
        .then((listings) => {
            res.status(201).json(listings);
        }).catch ((error) => {
            res.status(409).json({message: error.message});
    })
    /*try {
        const listings = await listingsModel.getListings();
        res.status(201).json(listings)
    } catch (error) {
        res.status(409).json({message: error.message});
    }*/
};

exports.getListingById = async (req, res) => {
    const id = req.params.id;
    try {
        const listing = await Listing.findOne({
            where: {
                id,
            },
        });
        res.status(201).json(listing);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
};

exports.createListing = async (req, res) => {
    const body = req.body;
    console.log(req.body)
    //Validate Listing
    if (!body) {
        res.status(400).send({
            msg: "Please enter all the fields"
        });

    } else {

        //Create Listing
        try {
            let newListing = await Listing.create({
                dog_name: body.dog_name,
                description: body.description,
                date_of_birth: body.date_of_birth,
                is_adopted: body.is_adopted
            });
            return res.send(201).json(newListing)
        } catch (error) {
            return res.status(409).json({message: error.message});
        }
    }
};


exports.updateListing = async (req, res) => {
    res.send('Update Listings')
};

exports.deleteListing = async (req, res) => {
    res.send('Delete listings')
};