const express = require('express');
require('./services/passport');
const app = express();

// require returns a function and we immediately call that function with the app object
//in authRoutes.js app is being passed in as a parameter to the exported function
require('./routes/authRoutes')(app);

//look at the underlying 'environment' and see if Heroku has found a port for us to use
const PORT = process.env.PORT || 5000;

//express tells node to listen on PORT 5000 since node is waiting there
app.listen(PORT);