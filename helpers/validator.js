const config = require('../config.json');
const jwt = require('jsonwebtoken');
const db = require('../helpers/db');
const User = db.User;
//Function to validate user
async function validateUser(req, res, next) {
    const bearerHeader = req.headers['token'];
    console.log(" *** Token :  " + bearerHeader + " ***");
    req.authenticated = false;
    if (bearerHeader) {
        jwt.verify(bearerHeader, config.secret, function (err, decoded) {
            if (err) {
                console.log(err);
                req.authenticated = false;
                req.userId = null;
                return res.status(400).json({ status: false, message: "Invalid authentication token provided." })
            } else {
                console.log("UserId: " + decoded.sub);
                req.userId = decoded.sub;
                req.authenticated = true;
                next();
            }
        });
    } else {
        return res.status(400).json({ status: false, message: "Authentication token has not provided." })
    }
}

//Export all stuffs
module.exports = validateUser


