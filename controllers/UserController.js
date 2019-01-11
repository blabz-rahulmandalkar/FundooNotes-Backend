const userRepository = require('../repositories/UserRepository');

module.exports = {
    login,
    register,
    registerDevice,
    deregisterDevice
}

// function login(req,res) {
//     userRepository.login(req.body)
//         .then(user => {
//             console.log(user);
//             if(user){
//                 res.status(200);
//                 res.setHeader('Content-Type', 'application/json');
//                 res.setHeader('Token', user.token);
//                 res.send(JSON.stringify({status:true,message: 'Login successfully'}));
//             } else{
//                 res.status(400).json({ status:false,message: 'Username or password is incorrect' })
//             }
//         })
//         .catch(err => {
//             console.error(err.message);
//         });
// }

function login(req, res) {
    userRepository.login(req, res, (code, response, token) => {
        if (code===200) {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Token', token);
        }
        res.status(code).json(response);
    })
}

function register(req, res) {
    userRepository.register(req, res, (code, response) => {
        res.status(code).json(response);
    })
}

function registerDevice(req, res) {
    userRepository.registerDevice(req, res, (code, response) => {
        res.status(code).json(response);
    })
}

function deregisterDevice(req, res) {
    userRepository.deregisterDevice(req, res, (code, response) => {
        res.status(code).json(response);
    })
}

