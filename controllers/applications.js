/**

* Functions to handle Applications 

* @module controllers/applications

* @author Bruna Coimbra

* @see models/* for the models that require this module

*/

const { Application } = require('../models');
  
exports.getApplications = async (req, res) => {
    try {
        await Application.findAll()
        .then((applications) => {
            res.status(201).json(applications);
        }).catch ((error) => {
            return res.status(409).json({message: error.message});
        })
    } catch (err) {
        return res.status(500).json({message: "Error finding applications"})
    }
        
};

/**
   * @function
   * 
   * @name -  getApplicationsById
   * 
   * Function to get all applications from the database
   * 
   * @param {int} id - Application Id 
   * 
   * @returns {object} - the object containing each application information 
   * 
   * @throws {error} -  if can't application by that id 
*/

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


/**
   * @function
   * 
   * @name - createApplication
   * 
   * Function to create a new application do the database 
   * 
   * @param {string} [business_name, description, date_founded, address] - application information 
   * 
   * @returns {object} - the new application created 
*/

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

/**
   * @function
   * 
   * @name updateApplication
   * 
   * Function to update the data of the new application do the dataabase 
   * 
   * @param {string} [business_name, description, date_founded, address] - application information to update 
   * 
   * @returns {object} - the new application with updated information 
*/
exports.updateApplication = async (req, res) => {

    const {business_name, description, date_founded, address} = req.body;
    const id = req.params.id;

    try {
        //Finds listing for certain id
        const application = await Application.findOne({ where: { id } });

        //If listing does not exist
        if (!application) {
            return res.status(400).send({ message: `Application unexistent for id ${id}` });
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

/**
   * @function
   * 
   * @name - deleteApplication
   * 
   * Function to delete a new application do the database 
   * 
   * @param {int} id - id of the application to the delete
   * 
   * @returns {object} - status 200, applcation was deleted
*/
exports.deleteApplication = async (req, res) => {
    const id = req.params.id;

    //if invalid id
    if (!id) {
        return res.status(400).send({
            message: "Please enter the id!"
        });
    }
    try {
        const application = await Application.findOne({
            where: {
                id,
            },
        });
        //if listing doesn't exist
        if (!application) {
            return res.status(400).send({
                message: `Application unexistent for id ${id}`
            });
        } else {
            try {
                await application.destroy();
                return res.status(200).send({
                    message: `Listing deleted for id ${id}`
                });
        
            } catch (error) {
                return res.status(500).send({
                    message: `An error occured when deleting the listing: ${error.message}`
                });     
            }
        }
    } catch (err) {
        return res.status(500).send({message: "Error finding application"})
    }   
};