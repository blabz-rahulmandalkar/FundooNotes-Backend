const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define Note Collection Schema
const  NoteSchema = new Schema({
    title: { type: String, default: "" },
    note: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    color: { type: String, default: "" },
    isPinned: { type: Boolean, default: false },
    isArchive: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    createDate:{ type: String, default: Date.now },
    reminderDate:{ type: String, default: ''},
    editDate:{ type: String, default: Date.now },
    user:{type:mongoose.Schema.ObjectId, ref:'users'}
})
module.exports = mongoose.model("notes", NoteSchema);
