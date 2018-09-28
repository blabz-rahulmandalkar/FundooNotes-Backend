
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const NoteRepository = require('../repositories/NoteRepository');


class NoteController {
    constructor() {
        this.noteRepository = new NoteRepository();
    }

    async loginUser(req, res) {
        let item = {
            status: true,
            message: "You have logined successfully.."
        }
        res.status(202);
        res.json(item);
    }

    async registerUser(req, res) {
        let item = {
            status: true,
            message: "You have register successfully.."
        }
        res.json(item);
    }

    async addNote(req, res) {
        this.noteRepository.addNote(req.body,(code,response)=>{
                res.status(code).json(response);
        });
    }

    async getNotes(req, res) {
        this.noteRepository.getNotes("", (error, items) => {
            var item = {
                status: false,
                message: '',
                data: []
            }
            if (error) {
                item.message = error.message;
                res.status(404).json(item);
            } else {
                item.status = true;
                item.message = 'Successfully retrived notes';
                item.data = items
                res.status(200).json(item);
            }
        })
    }

    async deleteAllNotes(req,res){
        this.noteRepository.deleteAllNotes("userid",(error)=>{
            var item = {
                status: false,
                message: '',
            }
            if(error){
                item.message = error.message;
                res.status(404).json(item);
            }else{
                item.status = true;
                item.message = 'Successfully deleted all notes';
                res.status(200).json(item);
            }
        })
    }

    async deleteNote(req,res){
        const contact = req.params.contact;
        this.noteRepository.deleteNote(contact,(error)=>{
            var item = {
                status: false,
                message: '',
            }
            if(error){
                item.message = error.message;
                res.status(404).json(item);
            }else{
                item.status = true;
                item.message = 'Successfully deleted note';
                res.status(200).json(item);
            }
        })
    }
}

module.exports = NoteController;