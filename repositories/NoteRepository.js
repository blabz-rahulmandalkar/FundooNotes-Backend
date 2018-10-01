const db = require('../helpers/db');
const Note = db.Note;
var ObjectId = require('mongodb').ObjectId;

class NoteRepository {

    constructor() {}

    async getNotes(req,res,callback) {
        const response = { status:false,message:'',data:[]}
        console.log("====== Called Get Notes API   =======");
        var userId = req.userId;
        console.log("UserId"+userId);
        var userObjectId = new ObjectId(userId);
        const query = Note.find({user:userObjectId});
        query.select('_id title note isPinned isArchive isDeleted editDate reminderDate createDate');
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

    async getNote(req,res,callback) {
        const response = { status:false,message:'',data:[]}
        console.log("====== Called Get Notes API   =======");
        var userId = req.userId;
        console.log("UserId"+userId);
        var userObjectId = new ObjectId(userId);
        if(!req.params.id){
            callback(404,{status:true,message:"Note id not found"});
        }
        const query = Note.findOne({user:userObjectId,_id:req.params.id});
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

    async addNote(req,res,callback) {
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

   async deleteForeverNotes(req,res,callback){
        console.log("====== Called Delete All Notes API   =======");
        var userId = req.userId;
        console.log("UserId"+userId);
        var userObjectId = new ObjectId(userId);
        Note.deleteMany({},(error)=>{
            callback(error);
        })
    }

    async updateNote(req,res,callback){
        console.log("====== Called Update Note API   =======");
        let userId = req.userId
        let userObjectId = new ObjectId(userId);
        if(!req.params.id){
            callback(404,{status:true,message:"Note id not found"})
        }
        console.log("Note ID: "+req.params.id);
        Note.findOneAndUpdate({user:userObjectId,_id:req.params.id},req.body,(err,doc,res)=>{
            if(err){
                callback(404,{status:true,message:err.message})
            }else{
                callback(200,{status:true,message:"Successfully note updated"})
            }
        });
    }

    async deleteNote(userId,noteId){
        console.log("====== Called Delete Note API   =======");
        console.log('User ID: '+userId);
        console.log('Note ID: '+noteId);
        Note.deleteOne({user:new ObjectId(userId),_id:new ObjectId(noteId)},(error)=>{
            if(error) throw error;
            return;
        });
    }
}


module.exports = NoteRepository;