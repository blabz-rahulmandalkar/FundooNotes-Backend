
const mongoose = require("mongoose");
const config = require('../config.json');

 //Connect to Remote Mongodb database
  let connectionURL = "mongodb://fundoonotes:"+encodeURIComponent("fundoonotes@431")+"@ds139934.mlab.com:39934/fundoonotes";//process.env.MONGOLAB_URI;
  mongoose.connect(connectionURL);

 //Connect to Local Mongodb database
  //mongoose.connect(config.connectionString);

 //Get Mongoose to use the global promise library
 mongoose.Promise = global.Promise;

 

 //Get the default connection
 var db = mongoose.connection;

 //Bind connection to error event (to get notification of connection errors)
 db.on('error', console.error.bind(console, 'MongoDB connection error:'));

 module.exports = {
     User: require('../models/User'),
     Note: require('../models/Note')
 }

 