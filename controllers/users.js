// Listings Controller
const { User } = require('../models');
const bcrypt = require('bcrypt');
const { rest } = require('lodash');

//Gets all users
exports.getUsers = async (req, res) => {
    try {
       await User.findAll()
        .then((users) => {
            res.status(201).json(users);
        }).catch ((error) => {
            res.status(409).json({message: error.message});
        }) 
    } catch (err) {
        res.status(500).json({message: error.message});
    }      
};

exports.createUser = async (req, res) => {
    const {name, email, password} = req.body;
    console.log(req.body)
    //Validate Listing
    if (!name || !email || !password ){
        return res.status(400).send({message: "Please enter all the fields" });
    }
    try {
        //If email already exists
            let emailRegistered = await User.findOne({
                where: {
                email,
                },
            });

            if (emailRegistered) {
                res.status(400).send({
                message: 'An account with that email already exists!',
                });
            }
			
						//Creates User
						try {
							const hashedPass = await bcrypt.hash(password, 10)
							let newUser = await User.create({
									name: name, 
									email: email,
									password: hashedPass
							});
							return res.json(newUser);
						} catch (error) {
							return res.status(500).json({message: error.message});
				}
    } catch (err) {
        res.status(400).send({message: "We cant find a user with that email."})
    }
};


/**
   * @function
   * @name getUserById
   * Function to get user id 
   * @param {int} id - User Id 
   * @returns {object} - the object containing each application information 
   * @throws {error} -  if can't application by that id 
*/
exports.getUserById = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({
            message: "Id entered doesn't exist."
        });
    }
    try {
        const user = await User.findOne({ where: { id } });
        res.status(201).json(user);
        return user;
    } catch (error) {
        res.status(409).json({message: error.message});
    }
};

/**
   * @function
   * @name getUserByEmail
   * Function to get user byt email
   * @param {email} - User email 
   * @returns {object} - returns user that corresponds to email 
   * @throws {error} - if can't find user with that email 
*/

exports.getUserByEmail = async (req, res) => {
    const email = req.body.email;
    if (!email) {
        return res.status(400).send({
            message: "Theres no user with that email"
        });
    }
    try {
        const user = await User.findOne({ where: { email } });
        res.status(201).json(user);
        return user;
    } catch (error) {
        res.status(409).json({message: error.message});
    }
};

/**
   * @function
   * @name updateUser 
   * Function to update User
   * @param {string} [name, email, password] - Information to update user with, 
   * @param {int} id - Id to know which user to update
   * @returns {object} -  the object containing each user information 
   * @throws {error} - if can't find user by that id 
*/
exports.updateUser = async (req, res) => {

    const {name, email, password} = req.body;
    const id = req.params.id;

    try {
        //Finds listing for certain id
        const user = await User.findOne({ where: { id } });
        //If listing does not exist
        if (!user) {
            return res.status(400).send({ message: `User unexistent for id ${id}` });
        }

        try {
            let updatedUser = await user.update({
                name: name, 
                email: email,
                password: password
            })
            return res.json(updatedUser);
            
        } catch (error) {
            return res.sendStatus(500)({message: error.message});
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
    
};

/**
   * @function
   * @name deleteUser
   * Function to delete an User
   * @param {int} id - User Id 
   * @returns {status} - 200 Status if user is deleted 
   * @throws {error} if can't user by that id 
*/

//Deletes the user
exports.deleteUser = async (req, res) => {
    const id = req.params.id;

    //if invalid id
    if (!id) {
        return res.status(400).send({
            message: "Please enter the id!"
        });
    }

    try {
        const user = await User.findOne({
            where: {
                id,
            },
        });
        //if user doesn't exist
        if (!user) {
            return res.status(400).send({
                message: `User unexistent for id ${id}`
            })
        } else {
            try {
                await user.destroy();
                return res.status(400).send({
                    message: `User deleted for id ${id}`
                });
        
            } catch (error) {
                return res.status(500).send({
                    message: `An error occured when deleting the user: ${error.message}`
                });
                
            }
        } 
    } catch (err) {
        return res.status(400).send({message: "Error finding user."})
    }

    

};