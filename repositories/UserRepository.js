const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helpers/db');
const User = db.User;

module.exports = {
    getById,
    login,
    register,
    registerDevice,
    deregisterDevice
};

async function login({ email, password }) {
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        console.log(userWithoutHash);
        return {token};
    }
}

async function register(userParam) {
    // validate
    if (await User.findOne({ email: userParam.email })) {
        throw `Username ${userParam.email} is already taken`;
    }

    const user = new User(userParam);
    
    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

async function registerDevice(req, res, callback){
    User.findByIdAndUpdate({ _id: req.userId }, req.body, (err, doc, res) => {
        if (err) {
            callback(404, { status: true, message: err.message })
        } else {
            callback(200, { status: true, message: "Successfully registered device" });
        }
    });
}

async function deregisterDevice(req, res, callback){
    const body = {
        deviceId:"",
        deviceToken:""
    }
    User.findByIdAndUpdate({ _id: req.userId },body, (err, doc, res) => {
        if (err) {
            callback(404, { status: true, message: err.message })
        } else {
            callback(200, { status: true, message: "Successfully de-registered device" });
        }
    });
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}