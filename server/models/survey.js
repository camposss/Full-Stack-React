const mongoose= require('mongoose');
const recipientSchema = require('./recipient');

const {Schema} = mongoose;

//we import the recipient schema as a subdocument collection to optimize storage since we only have 4MB in Mongo

//every survey is going to belong to a certain user. It will be the id of the user referenced to the User Schema in the other file
//underscore means that this is a reference field

// we will be able to tell the user how active the surveys are by the date fields


const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [recipientSchema],
    yes: {type: Number, default: 0},
    no: {type: Number, default: 0},
    _user: {type: Schema.Types.ObjectId, ref: "User"},
    dateSent: Date,
    lastResponded: Date
});

mongoose.model('surveys',surveySchema);