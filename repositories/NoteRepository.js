
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const MONGO_PORT = "27017";
const MONGO_DATABASE = "fundooNotes";

class NoteRepository {

    constructor() {
        //Set up default mongoose connection
        let mongoDB = `mongodb://localhost:${MONGO_PORT}/${MONGO_DATABASE}`;
        //Connect to Mongodb database
        mongoose.connect(mongoDB);

        //Get Mongoose to use the global promise library
        mongoose.Promise = global.Promise;

        //Get the default connection
        var db = mongoose.connection;

        //Bind connection to error event (to get notification of connection errors)
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));

        //Define Note Collection Schema
        var NoteSchema = new mongoose.Schema({
            title: { type: String, default: "" },
            note: { type: String, default: "" },
            isPinned: { type: Boolean, default: false },
            isArchive: { type: Boolean, default: false },
            contact: { type: Number, default: "" },
        }, {
                collection: 'Note'
            })

        //Create Note Model 
        this.Note = mongoose.model("Note", NoteSchema);
    }

    getNotes(userId, callback) {
        const query = this.Note.find();
        console.log("====== Called Get Notes API   =======");

        query.select('title note isPinned isArchive contact');
        query.exec((error, items) => {
            callback(error, items);
        })
    }

    addNote(body,callback) {
        const response = { status:false,message:''}
        var note = new this.Note(body);
        var query = this.Note.find({contact:note.contact});
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
        this.Note.deleteMany({},(error)=>{
            callback(error);
        })
    }

    deleteNote(contact,callback){
        console.log("====== Called Delete All Notes API   =======");
        this.Note.deleteOne({contact:contact},(error)=>{
            callback(error);
        })
    }
}


module.exports = NoteRepository;