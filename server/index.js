const express = require('express');
const mongoose = require ('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
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

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongoURI);

// require returns a function and we immediately call that function with the app object
//in authRoutes.js app is being passed in as a parameter to the exported function
require('./routes/authRoutes')(app);

//look at the underlying 'environment' and see if Heroku has found a port for us to use
const PORT = process.env.PORT || 5000;

//express tells node to listen on PORT 5000 since node is waiting there
app.listen(PORT);