const express = require('express');
const path = require('path');
const NoteController = require("./controllers/NoteController");
var mongoose = require("mongoose");
var bodyParser = require('body-parser');

//Connect to Mongodb database
mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:27017/fundooNotes");

//Define MongoSchema
var noteSchema = new mongoose.Schema({
    title: { type: String, default: "" },
    note: { type: String, default: "" },
    isPinned: { type: Boolean, default: false},
    isArchive: { type: Boolean, default: false },
    contact:  { type: Number, default: '' },
}, {
	collection: 'Note'
})

var Note =  mongoose.model("Note",noteSchema);

//Instances
var noteController = new NoteController();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

app.get("/login",(req,res)=> noteController.loginUser(req,res));

app.post("/register",(req,res)=> noteController.registerUser(req,res));

app.get("/notes",(req,res)=> {
    Note.find()
    .then(items => {
        var item ={
            status:true,
            message:"Successfully retrived notes",
            data:items
        }
        res.status(200).json(item);
    })
    .catch(err => {
        res.status(404).send("Unable to save to database");
    });
});



app.post("/addnote",(req,res)=> {
    var note = new Note(req.body);
    note.save(function(err, result) {
        if (err){
            res.status(400).send("Unable to save to database");
            throw err;
        };
        
		if(result) {
            var item ={
                status:true,
                message:"Successfully inserted note",
                data:JSON.stringify(result)
            }
			res.status(200).json(item)
		}
	})
  
});


app.get("/",(req,res)=> {
    res.status(200).send("Welcome");
    //res.render('index',{ title:'Google Keep Notes'});
});

app.listen(4000);




