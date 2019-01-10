const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobile: {type:String, required:true},
    deviceId: {type:String, required:false,default:""},
    deviceToken: {type:String, required:false,default:""},
    createdDate: { type: Date, default: Date.now },
    notes:[{type:mongoose.Schema.ObjectId, ref:'notes'}]
})
module.exports = mongoose.model("users",UserSchema);
