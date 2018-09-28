const express = require('express');
const path = require('path');
const errorHandler = require('./helpers/error-handler');
const config = require('./config.json');
//const jwt = require('./helpers/jwt');
const logger = require('morgan');
const userController = require("./controllers/UserController");
var bodyParser = require('body-parser');
const NoteRoute = require('./routes/Note');
const jwt = require('jsonwebtoken');

//Main app
const app = express();

//App Configuration
app.use(logger("dev"));
app.use(errorHandler);
//app.use(jwt());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

//API's
app.use('/note',validateUser,NoteRoute);

app.post("/login",(req,res)=> userController.login(req,res));

app.post("/register",(req,res)=> userController.register(req,res));


app.get("/",(req,res)=> {
    res.status(200).send("Welcome");
    //res.render('index',{ title:'Google Keep Notes'});
});

function validateUser(req, res, next) { 
    jwt.verify(req.headers.token, config.secret, function(err, decoded) {
      if (err) {
        res.json({status:false, message: err.message});
      }else{
        // add user id to request
        req.body.id = decoded.id;
        console.log("===== User Id ==="+decoded.id);
       // res.json({status:true, message: "Done"});
        next();
      }
    });  
}




//Listening on port
app.listen(4000,()=>{
    console.log("Started Listening to port .. 27017 ");
});




