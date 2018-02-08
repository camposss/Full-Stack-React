const express = require('express');
const app = express();

//this is a route handler. this is a get request HTTP request
// if anyone accesses the root route '/'
// object representing the incoming request
//res is the object representing the outgoing response
//res.send immediately send the JSON data response


app.get( '/', (req,res) => {
    res.send({broken:'we want to this again without breaking it'});
});

//look at the underlying 'environment' and see if Heroku has found a port for us to use
const PORT = process.env.PORT || 5000;

//express tells node to listen on PORT 5000 since node is waiting there
app.listen(PORT);