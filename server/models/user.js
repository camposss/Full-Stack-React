const mongoose = require('mongoose');
// const Schema= mongoose.Schema;
const {Schema }= mongoose;




//create a new schema and say the type of it
const userSchema= new Schema({
    googleId: String,
    credits: { type: Number, default: 0 }
});

//create a new collection by creating the model class
mongoose.model('users', userSchema);