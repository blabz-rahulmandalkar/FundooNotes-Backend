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

     async getTrashNotes(req, res) {
        await this.noteRepository.getTrashNotes(req,res,(code,response) => {
             res.status(code).json(response);
         })
     }

    
    async getNote(req, res) {
        await this.noteRepository.getNote(req,res,(code,response) => {
            res.status(code).json(response);
         })
    }

     async deleteTrashNotes(req,res){
        await this.noteRepository.deleteTrashNotes(req,res,(code,response) => {
            res.status(code).json(response);
        })
    }

    async deleteTrashNote(req,res){
        await this.noteRepository.deleteTrashNote(req,res,(code,response) => {
            res.status(code).json(response);
        })
    }

    async deleteNote(req,res){
        await this.noteRepository.deleteNote(req,res,(code,response) => {
            res.status(code).json(response);
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