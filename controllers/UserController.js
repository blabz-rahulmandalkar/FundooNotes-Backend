const userRepository = require('../repositories/UserRepository');

module.exports = {
    login,
    register
}

function login(req,res) {
    userRepository.login(req.body)
        .then(user => {
            console.log(user);
            if(user){
                res.status(200);
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Token', user.token);
                res.send(JSON.stringify({status:true,message: 'Login successfully'}));
            } else{
                res.status(400).json({ status:false,message: 'Username or password is incorrect' })
            }
        })
        .catch(err => {
            console.error(err.message);
        });
}

function register(req, res) {
    console.log('=== Register API Called');
    userRepository.register(req.body)
        .then(() => res.json({ status:true,message:'User has been register successfully'}))
        .catch(err => {
            console.log("=========== Register Error ======");
            console.error(err.message);
            res.json({ status:false,message:err.message});
        });
}