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

//Gets users by ID
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

//Creates Users
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
                return res.status(400).send({
                message: 'An account with that email already exists!',
                });
            }
    } catch (err) {
        res.status(400).send({message: "We cant find a user with that email."})
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

};

// Updates Userss
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
        }   
    } catch (err) {
        return res.status(400).send({message: "Error finding user."})
    }

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

};