const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobile: {type:String, required:true},
    createdDate: { type: Date, default: Date.now },
    notes:[{type:mongoose.Schema.Types.ObjectId, ref:'Note'}]
}, {
    collection: 'User'
})
UserSchema.set('toJSON', { virtuals: true });
module.exports = mongoose.model("User",UserSchema);
