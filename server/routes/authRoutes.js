const passport = require('passport');

module.exports = (app) =>{
//if you wnat to authenticate with google you refer to it as a string google when also using passport
//scope determines what access that we want. For exmaple you can ask for contact list or emails
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        }));
    app.get('/auth/google/callback', passport.authenticate('google'));
};
//this is a route handler. this is a get request HTTP request
// if anyone accesses the root route '/'
// object representing the incoming request
//res is the object representing the outgoing response
//res.send immediately send the JSON data response

// app.get( '/', (req,res) => {
//     res.send({broken:'we want to this again without breaking it'});
// });





