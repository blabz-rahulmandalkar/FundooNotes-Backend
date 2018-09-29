const express = require('express');
const path = require('path');
const errorHandler = require('./helpers/error-handler');
const config = require('./config.json');
const logger = require('morgan');
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const NoteRoute = require('./routes/Note');
const UserRoute = require('./routes/User');

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

app.use('/user',UserRoute);

app.get("/",(req,res)=> {
  
    res.status(200).send("Welcome");
});

function validateUser(req, res, next) { 
    var bearerHeader = req.headers['token'];
    var token;
    console.log("===== Token :  "+ bearerHeader +"  =====");
    req.authenticated = false;
    if (bearerHeader){
        jwt.verify(bearerHeader, config.secret, function (err, decoded){
            console.log("22222");
            if (err){
                console.log(err);
                req.authenticated = false;
                req.userId = null;
                res.status(401).json({status:false,message:"Invalid authentication token provided."})
                next();
            } else {
                console.log("33333");
                console.log(decoded);
                req.userId = decoded.sub;
                req.authenticated = true;
                next();
            }
        });
    }else{
      res.status(401).json({status:false,message:"Authentication token has not provided."})
    }
}

app.listen(4000,()=>{
    console.log("Started Listening to port .. 27017 ");
});




