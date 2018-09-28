const config = require('../config.json');
const expressJwt = require('express-jwt');
const userRepository = require('../repositories/UserRepository');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/',
            '/login',
            '/register'
        ]
    });
}

function fromCookie (req,res,next) {
    var token = req.headers.token;
    console.log("============ Token ===========");
    console.log("Token : "+ token);

    if (token) {
      return token;
    }else{
        
        return null;
    } 
}

async function isRevoked(req, payload, done) {
    console.log('Is Revoked Token : '+req.headers.token);
    console.log('Is Revoked Payload : '+payload);

    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};
function validateUser(req, res, next) {
    
    jwt.verify(req.headers['token'], config.secret, function(err, decoded) {
      if (err) {
        res.json({status:false, message: err.message});
      }else{
        // add user id to request
        req.body.userId = decoded.id;
        console.log("===== User Id ==="+decoded.id);
       // res.json({status:true, message: "Done"});
        next();
      }
    });
    
}

