const db = require('../helpers/db');
const Note = db.Note;

class NoteRepository {

    constructor() {}

    getNotes(userId, callback) {
        const query = Note.find().select('-hash');;
        console.log("====== Called Get Notes API   =======");

        query.select('title note isPinned isArchive contact');
        query.exec((error, items) => {
            callback(error, items);
        })
    }

    addNote(body,callback) {
        const response = { status:false,message:''}
        var note = new this.Note(body);
        var query = Note.find({contact:note.contact});
        console.log("====== Called Add Note API   =======");
        query.count((error,count)=>{
            if(count>0){
                response.message = "Note with this contact is already present";
                callback(208,response);
            }else{
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