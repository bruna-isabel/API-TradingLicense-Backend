// Listings Controller
const { User } = require('../models');

//Gets all listings
exports.getUsers = async (req, res) => {
        User.findAll()
        .then((users) => {
            res.status(201).json(users);
        }).catch ((error) => {
            res.status(409).json({message: error.message});
    })
};

//Gets Listings by ID
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
    } catch (error) {
        res.status(409).json({message: error.message});
    }
};

//Creates Listings
exports.createUser = async (req, res) => {

    const {name, email, password} = req.body;
    console.log(req.body)

    //Validate Listing
    if (!name || !email || !password ){
        return res.status(400).send({message: "Please enter all the fields" });
    }

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

    //Creates Listing
    try {
        let newUser = await User.create({
            name, 
            email,
            password
        });
        return res.json(newUser);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }

};

// Updates Listing
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

//Deletes a listing
exports.deleteUser = async (req, res) => {
    const id = req.params.id;

    //if invalid id
    if (!id) {
        return res.status(400).send({
            message: "Please enter the id!"
        });
    }

    const user = await User.findOne({
        where: {
            id,
        },
    });

    //if listing doesn't exist
    if (!user) {
        return res.status(400).send({
            message: `User unexistent for id ${id}`
        });
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