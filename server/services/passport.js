const passport= require('passport');
const mongoose= require('mongoose');
const GoogleStrategy= require ('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

const User= mongoose.model('users');

passport.serializeUser((user, done)=>{
    //done is a callback that we pass to passport nudging it along. params: (error object, identifying the user)
    //user id is the shortcut to the mongolab _id its a mongo identifier
    done(null, user.id);
});

passport.deserializeUser((id, done)=>{
   //turning an id into a mongo model instance user
   User.findById(id).then(user=>{
       done(null, user)
   })
});

//hey passport use google strategy to authenticate users
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, (accessToken, refreshToken, profile, done)=>{
        //mongoose queries checking if this exists which returns a promise

        User.findOne({googleId: profile.id}).then((existingUser)=>{
            if (existingUser){
                // we already have a record with given id
                //first parameter is error and second is the first parameter
                done(null, existingUser );
            }else{
                //creating a new instance and calling the .save mongoose method to save it to the database
                //.then returns the newly created from the database (proof that it actually uploaded)
                new User({googleId: profile.id}).save().then(user=> done(null,user));
            }
        });
    })
);