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
    Joi.validate(req.body, userValidationSchema, function (err, value) {
        if (err) {
            return callback(400, { status: false, message: err.message });
        } else {
            saveUser(req.body,(code,response)=>{
                callback(code,response);
            })
        }
    });

}

async function saveUser(body,callback){
    if (await User.findOne({ email: body.email })) {
        return callback(400, { status: false, message: `Username ${body.email} is already taken` });
    } else {
        const user = new User(body);
        // hash password
        if (body.password) {
            user.hash = bcrypt.hashSync(body.password, 10);
        }
        // save user
        user.save((err, value) => {
            if (err) {
                return callback(400, { status: true, message: err.message });
            }
            return callback(200, { status: true, message: Constant.MSG_REGISTERED_USER });
        })
    }
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