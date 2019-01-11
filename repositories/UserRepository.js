const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helpers/db');
const User = db.User;
const Joi = require('joi');
const Constant = require('../helpers/constant');

module.exports = {
    getById,
    login,
    register,
    registerDevice,
    deregisterDevice
};

// async function login({ email, password }) {
//     const user = await User.findOne({ email });
//     if (user && bcrypt.compareSync(password, user.hash)) {
//         const { hash, ...userWithoutHash } = user.toObject();
//         const token = jwt.sign({ sub: user.id }, config.secret);
//         console.log(userWithoutHash);
//         return { token };
//     }
// }

async function login(req, res, callback) {
    const loginValidationSchema = Joi.object().keys({
        email: Joi.string().regex(/\S+@\S+\.\S+/).required(),
        password: Joi.string().min(6).max(15).required(),
    })
    await Joi.validate(req.body, loginValidationSchema, function (err, value) {
        if (err) {
            return callback(400, { status: false, message: err.message });
        }
    });
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.hash)) {
            const { hash, ...userWithoutHash } = user.toObject();
            const token = jwt.sign({ sub: user.id }, config.secret);
            console.log(userWithoutHash);
            console.log('Token: ' + token);
            return callback(200, { status: true, message: Constant.MSG_USER_LOGINED }, token)
        } else {
            callback(400, { status: false, message: Constant.MSG_INCORRECT_PASSWORD })
        }
    } else {
        return callback(401, { status: false, message: Constant.MSG_USER_NOT_FOUND })
    }
}

async function register(req, res, callback) {
    const userValidationSchema = Joi.object().keys({
        firstName: Joi.string().min(3).regex(/^[a-zA-Z]/).required(),
        lastName: Joi.string().min(3).regex(/^[a-zA-Z]/).required(),
        email: Joi.string().regex(/\S+@\S+\.\S+/).required(),
        mobile: Joi.string().regex(/^[0-9]{10}$/).required(),
        password: Joi.string().min(6).max(15).required(),
    });
    await Joi.validate(req.body, userValidationSchema, function (err, value) {
        if (err) {
            return callback(400, { status: false, message: err.message });
        }
    });
    if (await User.findOne({ email: req.body.email })) {
        return callback(400, { status: false, message: `Username ${req.body.email} is already taken` });
    }
    const user = new User(req.body);
    // hash password
    if (req.body.password) {
        user.hash = bcrypt.hashSync(req.body.password, 10);
    }
    // save user
    await user.save((err, value) => {
        if (err) {
            return callback(400, { status: true, message: err.message });
        }
        return callback(200, { status: true, message: Constant.MSG_REGISTERED_USER });
    })
}

async function registerDevice(req, res, callback) {
    await User.findByIdAndUpdate({ _id: req.userId }, req.body, (err, doc, res) => {
        if (err) {
            callback(404, { status: true, message: err.message })
        } else {
            callback(200, { status: true, message: "Successfully registered device" });
        }
    });
}

async function deregisterDevice(req, res, callback) {
    const body = {
        deviceId: "",
        deviceToken: ""
    }
    User.findByIdAndUpdate({ _id: req.userId }, body, (err, doc, res) => {
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