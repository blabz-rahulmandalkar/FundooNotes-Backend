const express = require('express');
const path = require('path');
const NoteController = require("./controllers/NoteController");
var bodyParser = require('body-parser');

//Note Controller Instances
var noteController = new NoteController();

//Main app
const app = express();

//App Configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

//API's

app.get("/login",(req,res)=> noteController.loginUser(req,res));

app.post("/register",(req,res)=> noteController.registerUser(req,res));

app.get("/notes",(req,res)=> noteController.getNotes(req,res));

app.post("/addnote",(req,res)=> noteController.addNote(req,res));

app.put("/deleteAllNotes",(req,res)=> noteController.deleteAllNotes(req,res));

app.put("/deleteNote/:contact",(req,res)=> noteController.deleteNote(req,res));


app.get("/",(req,res)=> {
    res.status(200).send("Welcome");
    //res.render('index',{ title:'Google Keep Notes'});
});

//Listening on port
app.listen(4000);




