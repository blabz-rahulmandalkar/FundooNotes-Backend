const db = require('../helpers/db');
const Note = db.Note;
const User = db.User;
const ObjectId = require('mongodb').ObjectId;
const Constant = require('../helpers/constant');
const sendNotification = require('../firebase/send');
class NoteRepository {

    constructor() { }

    async getNotes(req, res, callback) {
        const query = Note.find({ user: new ObjectId(req.userId) }).populate('user',['email']);
        //query.select('_id title note isPinned isArchive isDeleted editDate reminderDate createDate');
        query.exec((error, items) => {
            if (error) {
                callback(404, { status: false, message: Constant.MSG_FAILED_TO_LOAD });
            } else {
                if (items.length>0)
                    callback(200,{ status: true, message: Constant.MSG_NOTES_AVAILABLE,data:items});
                else
                    callback(200,{ status: true, message: Constant.MSG_NOTES_NOT_AVAILABLE,data:items});
            }
        })
    }
    //Get Dashboard notes
    async getDashboardNotes(req, res, callback) {
        const query = Note.find({ user: new ObjectId(req.userId),isArchive:false,isDeleted:false });
        query.select('_id title note isPinned isArchive isDeleted editDate reminderDate createDate');
        query.exec((error, items) => {
            if (error) {
                callback(404, { status: false, message: Constant.MSG_FAILED_TO_LOAD });
            } else {
                if (items.length>0)
                    callback(200,{ status: true, message: Constant.MSG_NOTES_AVAILABLE,data:items});
                else
                    callback(200,{ status: true, message: Constant.MSG_NOTES_NOT_AVAILABLE,data:items});
            }
        })
    }

     //Get Archive notes
     async getArchiveNotes(req, res, callback) {
        const query = Note.find({ user: new ObjectId(req.userId),isArchive:true,isDeleted:false });
        query.select('_id title note isPinned isArchive isDeleted editDate reminderDate createDate');
        query.exec((error, items) => {
            if (error) {
                callback(404, { status: false, message: Constant.MSG_FAILED_TO_LOAD });
            } else {
                if (items.length>0)
                    callback(200,{ status: true, message: Constant.MSG_NOTES_AVAILABLE,data:items});
                else
                    callback(200,{ status: true, message: Constant.MSG_NOTES_NOT_AVAILABLE,data:items});
            }
        })
    }

    async getTrashNotes(req, res, callback) {
        const query = Note.find({ user: new ObjectId(req.userId),isDeleted:true });
        query.select('_id title note isPinned isArchive isDeleted editDate reminderDate createDate');
        query.exec((error, items) => {
            if (error) {
                callback(404, { status: false, message: Constant.MSG_FAILED_TO_LOAD });
            } else {
                if (items.length>0)
                    callback(200,{ status: true, message: Constant.MSG_NOTES_AVAILABLE,data:items});
                else
                    callback(200,{ status: true, message: Constant.MSG_NOTES_NOT_AVAILABLE,data:items});
            }
        })
    }

    async getNote(req, res, callback) {
        if (!req.params.id) {
            callback(400, { status: true, message: Constant.MSG_ID_NOT_FOUND });   
        }
        const query = Note.findOne({ user: new ObjectId(req.userId), _id: req.params.id })
        query.select('_id title note isPinned isArchive isDeleted editDate reminderDate createDate');
        query.exec((error, item) => {
            if (error) {
                callback(404, { status: false, message: Constant.MSG_FAILED_TO_LOAD });
            } else {
                if(item)
                    callback(200,{ status: true, message: Constant.MSG_NOTE_AVAILABLE,data:item});
                else
                    callback(200,{ status: false, message: Constant.MSG_NOTE_NOT_AVAILABLE});
            }
        })
    }

    async addNote(req, res, callback) {
        req.body.user = new ObjectId(req.userId);
        const note = new Note(req.body);
        note.save(function (error, item) {
            if (error) {
                callback(404, { status: false, message: error.details[0].message });
            } else {
                User.findById(req.userId, function (err, user) { 
                    if(err===null){
                        if(user.deviceToken && user.deviceToken!==""){
                            console.log("User has device token");
                            sendNotification(user.deviceToken,item.title,item.note);
                        }else{
                            console.log("User has not device token");
                        }
                    }
                });
                callback(200, { status: true, message: Constant.MSG_SUCCESS_NOTE_ADDED,data: item});
            }
        })
    }

    async deleteTrashNotes(req, res, callback) {
        try {
            var arr = JSON.stringify(req.body);
            var jsonObj = JSON.parse(arr);
            if (jsonObj instanceof Array) {
                const ids = jsonObj.map((item)=>{ return ObjectId(item._id.toString())});
                Note.deleteMany({user: new ObjectId(req.userId), _id: { $in :ids}}, (error) => {
                    if (error)
                        callback(400, { status: false, message: error.message }); 
                    else
                        callback(200, { status: false, message: "Notes are deleted from trash" }); 
                });
            } else {
                callback(400, { status: false, message: "Invalid body!, make sure it is JSON array" })
            }
        } catch (error) {
                callback(404, { status: false, message: error.message })
        }
    }

    async deleteTrashNote(req, res, callback) {
        if(!req.params.id){
            return callback(400,{status:false,message:'Note ID not found'})
        }
        Note.deleteOne({ user: new ObjectId(req.userId), _id: new ObjectId(req.params.id) }, (error) => {
            if(error){
                callback(400,{status:false,message:error.message})
            }else{
               callback(200,{status:true,message:"Note is delete from trash"})
            }
        });
    }

    async updateNote(req, res, callback) {
        if (!req.params.id) {
            callback(404, { status: true, message: "Note id not found" })
        }
        req.body.editDate = Date.now();
        Note.findOneAndUpdate({ user: new ObjectId(req.userId), _id: req.params.id }, req.body, (err, doc) => {
            if (err) {
                callback(404, { status: true, message: err.message })
            } else {
                callback(200, { status: true, message: "Successfully note updated" });
            }
        });
    }

    async deleteNote(req, res, callback) {
        if (!req.params.id) {
            callback(404, { status: true, message: "Note id not found" })
        }
        req.body.editDate = Date.now();
        Note.findOneAndUpdate({ user: new ObjectId(req.userId), _id: req.params.id }, {$set:{isDeleted:true}}, {new:true}, (err, doc) => {
            if (err) {
                callback(404, { status: true, message: err.message })
            } else {
                callback(200, { status: true, message: "Note is deleted successfully" });
            }
        });
    }

    async deleteNotes(req, res, callback) {
        try {
            var arr = JSON.stringify(req.body);
            var jsonObj = JSON.parse(arr);
            if (jsonObj instanceof Array) {
                const ids = jsonObj.map((item)=>{ return ObjectId(item._id.toString())});
                Note.updateMany({user: new ObjectId(req.userId), _id: { $in :ids}},{$set:{ isDeleted:true}}, {new:true}, (err, doc) => {
                    if (err) {
                        callback(404, { status: true, message: err.message })
                    } else {
                        callback(200, { status: true, message: "Notes are deleted successfully" });
                    }
                })
            } else {
                callback(400, { status: false, message: "Invalid body!, make sure it is JSON array" })
            }
        } catch (error) {
                callback(404, { status: false, message: error.message })
        }
    }
}


module.exports = NoteRepository;