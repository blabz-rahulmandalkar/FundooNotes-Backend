const NoteRepository = require('../repositories/NoteRepository');

class NoteController {
    constructor() {
        this.noteRepository = new NoteRepository();
    }

    async addNote(req, res) {
        await this.noteRepository.addNote(req,res,(code,response)=>{
            res.status(code).json(response);
        });
    }

    async getAllNotes(req, res) {
       await this.noteRepository.getNotes(req,res,(code,response) => {
            res.status(code).json(response);
        })
    }

    async getDashboardNotes(req, res) {
        await this.noteRepository.getDashboardNotes(req,res,(code,response) => {
             res.status(code).json(response);
         })
     }

     async getArchiveNotes(req, res) {
        await this.noteRepository.getArchiveNotes(req,res,(code,response) => {
             res.status(code).json(response);
         })
     }

    async getNote(req, res) {
        await this.noteRepository.getNote(req,res,(code,response) => {
            res.status(code).json(response);
         })
     }

    async deleteForeverNotes(req,res){
        await this.noteRepository.deleteForeverNotes("userid",(error)=>{
            
        })
    }

    async deleteNote(req,res){
        let userId = req.userId;
        let noteId = req.params.id;
        if(!noteId){
            res.status(404).json({status:false,message:"Note id not found"})
        }
        await this.noteRepository.deleteNote(userId,noteId).then(()=>{
            res.status(200).json({status:true,message:"Note is deleted successfuly"})
        }).catch( error =>{
            res.status(404).json({status:false,message:error.message})
        })
    }

    async deleteNotes(req,res){
        await this.noteRepository.deleteNotes(req,res,(code,response) => {
            res.status(code).json(response);
        })
    }

    async updateNote(req,res){
        await this.noteRepository.updateNote(req,res,(code,response)=>{
            res.status(code).json(response);
        });
    }
}

module.exports = NoteController;