const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define Note Collection Schema
const  NoteSchema = new Schema({
    title: { type: String, default: "" },
    note: { type: String, default: "" },
    isPinned: { type: Boolean, default: false },
    isArchive: { type: Boolean, default: false },
    contact: { type: Number, default: "" },
}, {
        collection: 'Note'
    })

module.exports = mongoose.model("Note", NoteSchema);