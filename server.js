const validateUser = require ('./helpers/validator');
const express = require('express');
const morgan = require('morgan');
var bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

//Create app using express
const app = express();

//Set PORT 
const PORT = process.env.PORT || 4000

//App Configuration
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs');

//Routes the API's
app.use('/api/notes',validateUser,require('./routes/Note'));

app.use('/api/users/registerDevice',validateUser,require('./routes/User'));

app.use('/api/users/deregisterDevice',validateUser,require('./routes/User'));

app.use('/api/users',require('./routes/User'));

app.get('*',(req,res)=>{
    res.render('index',{title:"FundooNotes Backend"});
})

//Listen to port
app.listen(PORT,()=>{
    console.log(`Started Listening to port ${PORT}`);
});





