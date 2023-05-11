const express = require('express');
const app = express();
const port = 8000;

app.use('/' , require('./routes'));

//setting up the engine
app.set('view engine' , 'ejs');
app.set('views', './views');


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server ${err}`);
    }

    console.log(`The server is running on port : ${port}`);
})