const express = require('express');
const mongoose = require ('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser= require('body-parser');
//must define the schema in /models/user before creating new instances in passport
require('./models/user');
require('./services/passport');
const keys=require('./config/keys');
const app = express();

app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,
        keys: [keys.cookieKey]
    })
);

//if you are using middleware like body parser you must type app.use
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongoURI);

// require returns a function and we immediately call that function with the app object
//in authRoutes.js app is being passed in as a parameter to the exported function
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if(process.env.NODE_ENV==='production'){
    //express will serve up production asssets like main.js or main.css

    app.use(express.static('client/build'));

    //express will serve up the index.html file if it doesn't know the file

    const path = require('path');
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//look at the underlying 'environment' and see if Heroku has found a port for us to use
const PORT = process.env.PORT || 5000;

//express tells node to listen on PORT 5000 since node is waiting there
app.listen(PORT);