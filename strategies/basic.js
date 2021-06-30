const BasicStrategy = require('passport-http').BasicStrategy;
const users = require('../models/users');

const verifyPassword = function (user, password) {
    // compare user.password with the password supplied
    return user.password === password;

}
const checkUserAndPass = async (email, password, done) => {
    // look up the user and check the password if the user exists
    // call done() with either an error or the user, depending on outcome
    let result;
    try {
        result = await users.getUserByEmail(email);
    } catch (error) {
        console.error(`Error during authentication for user ${email}`);
        return done(error);
    }
    
    if (result.length) {
        const user = result[0];
        if (verifyPassword(user, password)) {
            console.log(`Successfully authenticated user ${email}`);
            return done(null, user);
        } else {
            console.log(`Password incorrect for user ${email}`);
        }
    } else {
        console.log(`No user found with username ${email}`);    
    }
    return done(null, false); // username or password were incorrect    
}

const strategy = new BasicStrategy(checkUserAndPass);
module.exports = strategy;