const express = require('express');
const router = express.Router();
const NoteController = require("../controllers/NoteController");
const noteController = new NoteController();

router.get("/getNotes",(req,res)=> noteController.getNotes(req,res));
router.post("/addnote",(req,res)=> noteController.addNote(req,res));
router.put("/deleteAllNotes",(req,res)=> noteController.deleteAllNotes(req,res));
router.put("/deleteNote/:contact",(req,res)=> noteController.deleteNote(req,res));

module.exports = router;