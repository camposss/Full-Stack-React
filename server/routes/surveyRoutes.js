//our middleware is requireLogin; user must be logged in to do a survey
//you want to put the middlewares in the order of execution... logged in first => make sure they have credits => then req/res
//you have to require in mongoose at the top in order to avoid errors during testing. Mongoose doesn't like multiple files being imported without the require mongoose step at the top.
// _user is available to use through the mongo/mongoose model
//Webhook is when a 3rd party api gives us a response through a callback after something they did (Sendgrid sends us the message about the click to our servers)

const _ =require('lodash');
const Path = require('path-parser');
const {URL}= require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Survey = mongoose.model('surveys');

module.exports = app =>{
    app.get('/api/surveys/thanks', (req,res)=>{
        res.send('thanks for voting!');
    });


    app.post('/api/surveys/webhooks', (req,res)=>{
        const p= new Path('/api/surveys/:surveyId/:choice');
        _.chain(req.body)
            .map(({email,url}) =>{
                //if it cant extract survey id and choice then it will return null thats why you cant destructure the match variable
                const match = p.test(new URL(url).pathname);
                if(match){
                    return {email, surveyId: match.surveyId, choice: match.choice};
                }
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .each(({surveyId,email, choice})=>{
                Survey.updateOne({
                    _id: surveyId,
                    recipients: {
                        $elemMatch:{email: email, responded: false}
                    }
                },{
                    $inc: { [choice]:1 },
                    $set: { 'recipients.$.responded': true }

                }).exec();
            })
            .value();
        res.send({});
    });
    app.post('/api/surveys', requireLogin, requireCredits, async (req,res)=>{
        const {title, subject, body, recipients }= req.body;

        const survey = new Survey({
            title:title,
            subject: subject,
            body: body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now(),

        });
        //great place to send an email after making the instance
        const mailer = new Mailer(survey, surveyTemplate(survey));

        try{
            await mailer.send();
            await survey.save();
            req.user.credits-=1;
            const user =await req.user.save();
            res.send(user);
        } catch(err){
            res.status(422).send(err);
        }

    });

};


