const db = require('../helpers/db');
const Note = db.Note;
var ObjectId = require('mongodb').ObjectId;

class NoteRepository {

    constructor() {}

    getNotes(req,res,callback) {
        const response = { status:false,message:'',data:[]}
        console.log("====== Called Get Notes API   =======");
        var userId = req.userId;
        console.log("UserId"+userId);
        var userObjectId = new ObjectId(userId);
        const query = Note.find({user:userObjectId});
        query.select('_id title note isPinned isArchive');
        query.exec((error, items) => {
            if(error){
                response.message = "Failed to load list";
                callback(404,response);
            }else{
                response.status = true
                response.message = "Successfully retrived notes";
                response.data = items;
                callback(200,response);
            }
        })
    }

    addNote(req,res,callback) {
        const response = { status:false,message:''}
        var userId = req.userId;
        console.log("UserId"+userId);
        var userObjectId = new ObjectId(userId);
        req.body.user = userObjectId;
        console.log(req.body);
        var note = new Note(req.body);
        console.log("====== Called Add Note API   =======");
        note.save(function (error, item) {
                        if(error){
                            response.message = error.message;
                            callback(404,response);
                        }else{

                            response.status = true;
                            response.message = "Note inserted succfully ";
                            callback(200,response);
                        }
        }) 
    }

    deleteAllNotes(userId,callback){
        console.log("====== Called Delete All Notes API   =======");
        Note.deleteMany({},(error)=>{
            callback(error);
        })
    }

    deleteNote(contact,callback){
        console.log("====== Called Delete All Notes API   =======");
        Note.deleteOne({contact:contact},(error)=>{
            callback(error);
        })
    }
}


module.exports = NoteRepository;