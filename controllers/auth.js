const { User } = require('../models');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {

    //tries to find user by email 
    const email = req.body.email;
    if (!email) {
        return res.status(400).send({
            message: "Please insert all details"
        });
    }
    let result;

    try {
        result = await User.findOne({ where: { email } });
        console.log(result)
    } catch (error) {
        res.status(409).json({message: "Error during authentication"});
        return
    }

    if (Object.keys(result).length) {
        user = result.dataValues
        console.log(user)
        //Compares passwords
        try {
            let passwordsMatch = await bcrypt.compare(req.body.password, user.password)
            if (passwordsMatch) {
                return res.send('Password Match')
            } else {
                res.send('Not a Match')
            }
        } catch (err) {
            res.status(500).send()
            console.log(err.message)
        }
    } else {
        return res.status(400).send('Theres no user matching those details');
    }
 
};

exports.signup = async (req, res) => {

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
