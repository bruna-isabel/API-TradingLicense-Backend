require('dotenv').config();

const { User } = require('../models');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {

    //tries to find user by email 
    const email = req.body.email;
    if (!email) {
        return res.status(400).send({
            message: "Please insert all details"
        });
    }
    let result = {};
    try {
        result = await User.findOne({ where: { email } });
        console.log(result)

        if (Object.keys(result).length) {
            user = result.dataValues
            console.log(user)
            
            //Compares passwords
            try {
                let passwordsMatch = await bcrypt.compare(req.body.password, user.password)
                if (passwordsMatch) {
                    //gets token
                    const token = jwt.sign({id: user.id}, process.env.ACCESS_TOKEN_SECRET)
                    res.json({token: token})
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
    } catch (error) {
        return res.status(409).json({message: "Not able to find user"});
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

// FORMAT OF TOKEN 
// Authoriazation: Bearer <token>

//Middleware 
exports.authenticateToken = (req, res, next)  => {
    const authHeader  =  req.headers['authorization']
    //return undefined if the authheader is there
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next() 
    })
}

//User Access Role
exports.authUser = (req, res, next) => {
    if (req.user == null) {
        res.status(403)
        return res.send("You need to sign in")
    }
    next()
}

exports.authRole = (req, res, next, role) => {
    return (req, res, next) => {
         if (req.body.RoleId == role) {
             console.log(req.body.RoleId)
            res.status(401)
            return res.send("Not Allowed")
         }
    }
}