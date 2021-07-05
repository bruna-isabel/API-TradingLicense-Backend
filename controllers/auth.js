require('dotenv').config();

const { User } = require('../models');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


/**
   * @function 
   * @name login
   * Function to login users in API 
   * @param {string} [email, password] - User information to login
   * @returns {object} access jwt token - token to confirm user exists 
   * @throws {error} - if user is not authorized 
*/

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

/**
   * @function 
   * @name signup
   * Function create new users in system
   * @param {string} [name, email, password] - User information to sign up 
   * @returns {object}  - 200 status, new user json information
   * @throws {error} - if parameters not correct. if user does not exist
*/

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
 * MIDDLEWARE FUNCTION
   * @function 
   * @name authenticateTokem
   * Function that verifies if user token is valid 
   * @param {token} - User Token generated 
   * @returns {status} 200 - Status 200 to indicate user token is valid
   * @throws {error} - if token not valid 
   * 
   * FORMAT OF TOKEN : Authorization: Bearer <token>
*/

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

/**
 * MIDDLEWARE FUNCTION
   * @function 
   * @name authRole
   * Function that verifies user role 
   * @param {int} user.Role.id - User Role ID
   * @returns {status} - Status 200 to indicate if role is authorised
   *
*/
//partial function with role as a param
exports.authRole = (role) => {
    return (req, res, next) => {
         if (req.body.RoleId == role) {
             console.log(req.body.RoleId)
            res.status(401)
            return res.send("Not Allowed")
         }
    }
}