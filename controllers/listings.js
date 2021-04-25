// Listings Controller
const { Listing } = require('../models');

//Gets all listings
exports.getListings = async (req, res) => {
        Listing.findAll()
        .then((listings) => {
            res.status(201).json(listings);
        }).catch ((error) => {
            res.status(409).json({message: error.message});
    })
};

//Gets Listings by ID
exports.getListingById = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({
            message: "Id entered doesn't exist."
        });
    }
    try {
        const listing = await Listing.findOne({ where: { id } });
        res.status(201).json(listing);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
};

//Creates Listings
exports.createListing = async (req, res) => {

    const {dog_name, description, date_of_birth, is_adopted} = req.body;
    console.log(req.body)

    //Validate Listing
    if (!dog_name || !description || !date_of_birth || !is_adopted ){
        return res.status(400).send({message: "Please enter all the fields" });
    }

    //Creates Listing
    try {
        let newListing = await Listing.create({
            dog_name,
            description,
            date_of_birth,
            is_adopted
        });
        return res.json(newListing);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }

};

// Updates Listing
exports.updateListing = async (req, res) => {

    const {dog_name, description, date_of_birth, is_adopted} = req.body;
    const id = req.params.id;

    try {

        //Finds listing for certain id
        const listing = await Listing.findOne({ where: { id } });

        //If listing does not exist
        if (!listing) {
            return res.status(400).send({ message: `Listing unexistent for id ${id}` });
        }

        try {
            let updatedListing = await listing.update({
                dog_name: dog_name,
                description: description,
                date_of_birth: date_of_birth,
                is_adopted: is_adopted
            })
            return res.json(updatedListing);
            
        } catch (error) {
            return res.sendStatus(500)({message: error.message});
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
    
};

//Deletes a listing
exports.deleteListing = async (req, res) => {
    const id = req.params.id;

    //if invalid id
    if (!id) {
        return res.status(400).send({
            message: "Please enter the id!"
        });
    }

    const listing = await Listing.findOne({
        where: {
            id,
        },
    });

    //if listing doesn't exist
    if (!listing) {
        return res.status(400).send({
            message: `Listing unexistent for id ${id}`
        });
    }

    try {
        await listing.destroy();
        return res.status(400).send({
            message: `Listing deleted for id ${id}`
        });

    } catch (error) {
        return res.status(500).send({
            message: `An error occured when deleting the listing: ${error.message}`
        });
        
    }

};