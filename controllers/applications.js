// Listings Controller
const { Application } = require('../models');

//Gets all listings
exports.getApplications = async (req, res) => {
        Application.findAll()
        .then((applications) => {
            res.status(201).json(applications);
        }).catch ((error) => {
            res.status(409).json({message: error.message});
    })
};

//Gets Listings by ID
exports.getApplicationById = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({
            message: "Id entered doesn't exist."
        });
    }
    try {
        const application = await Application.findOne({ where: { id } });
        res.status(201).json(application);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
};

//Creates Listings
exports.createApplication = async (req, res) => {

    const {business_name, description, date_founded, address} = req.body;
    console.log(req.body)

    //Validate Listing
    if (!business_name || !description || !date_founded|| !address ){
        return res.status(400).send({message: "Please enter all the fields" });
    }

    //Creates Listing
    try {
        let newApplication = await Application.create({
            business_name, 
            description, 
            date_founded, 
            address
        });
        return res.json(newApplication);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }

};

// Updates Listing
exports.updateApplication = async (req, res) => {

    const {business_name, description, date_founded, address} = req.body;
    const id = req.params.id;

    try {

        //Finds listing for certain id
        const application = await Listing.findOne({ where: { id } });

        //If listing does not exist
        if (!application) {
            return res.status(400).send({ message: `Listing unexistent for id ${id}` });
        }

        try {
            let updatedApplication = await application.update({
                business_name, 
                description, 
                date_founded, 
                address
            })
            return res.json(updatedApplication);
            
        } catch (error) {
            return res.sendStatus(500)({message: error.message});
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
    
};

//Deletes a listing
exports.deleteApplication = async (req, res) => {
    const id = req.params.id;

    //if invalid id
    if (!id) {
        return res.status(400).send({
            message: "Please enter the id!"
        });
    }

    const application = await Application.findOne({
        where: {
            id,
        },
    });

    //if listing doesn't exist
    if (!application) {
        return res.status(400).send({
            message: `Listing unexistent for id ${id}`
        });
    }

    try {
        await application.destroy();
        return res.status(400).send({
            message: `Listing deleted for id ${id}`
        });

    } catch (error) {
        return res.status(500).send({
            message: `An error occured when deleting the listing: ${error.message}`
        });
        
    }

};