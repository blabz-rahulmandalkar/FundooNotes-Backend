const express = require('express');
const router = express.Router();
const NoteController = require("../controllers/NoteController");
const noteController = new NoteController();

router.get("",(req,res)=> noteController.getNotes(req,res));

router.get("/:id",(req,res)=> noteController.getNote(req,res));

router.post("",(req,res)=> noteController.addNote(req,res));

router.put("/deleteForeverNotes",(req,res)=> noteController.deleteForeverNotes(req,res));

router.delete("/:id",(req,res)=> noteController.deleteNote(req,res));
router.delete("",(req,res)=> noteController.deleteNotes(req,res));


router.put("/:id",(req,res)=> noteController.updateNote(req,res));


module.exports = router;