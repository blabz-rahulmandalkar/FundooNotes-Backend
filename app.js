const express = require('express');
const _PORT = 4000;
const app = express();

app.use(express.static(__dirname + '/'));

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.listen(process.env.PORT || _PORT);