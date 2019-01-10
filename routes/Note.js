const express = require('express');
const router = express.Router();
const NoteController = require("../controllers/NoteController");
const noteController = new NoteController();

router.get("",(req,res)=> noteController.getAllNotes(req,res));

router.get("/dashboard",(req,res)=> noteController.getDashboardNotes(req,res));

router.get("/archive",(req,res)=> noteController.getArchiveNotes(req,res));

router.get("/trash",(req,res)=> noteController.getTrashNotes(req,res));

router.get("/:id",(req,res)=> noteController.getNote(req,res));

router.post("",(req,res)=> noteController.addNote(req,res));

router.delete("/trash",(req,res)=> noteController.deleteTrashNotes(req,res));

router.delete("/trash/:id",(req,res)=> noteController.deleteTrashNote(req,res));

router.delete("/:id",(req,res)=> noteController.deleteNote(req,res));

router.delete("",(req,res)=> noteController.deleteNotes(req,res));

router.put("/:id",(req,res)=> noteController.updateNote(req,res));

module.exports = router;