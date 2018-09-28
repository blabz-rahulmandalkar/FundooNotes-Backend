const userRepository = require('../repositories/UserRepository');

module.exports = {
    login,
    register
}

function login(req,res) {
    userRepository.login(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => {
            console.error(err.message);
        });
}

function register(req, res) {
    console.log('=== Register API Called');
    userRepository.register(req.body)
        .then(() => res.json({}))
        .catch(err => {
            console.log("=========== Register Error ======");
            console.error(err.message);
        });
}