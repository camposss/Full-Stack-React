const keys= require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey );
const requireLogin = require('../middlewares/requireLogin');

module.exports = app =>{
    //require Login is put as a second argument as middleware! Reference to this function and express calls it itself
    //we can pass as many middlewares, one of them HAS TO RETURN A RESPONSE
    app.post('/api/stripe', requireLogin, async (req, res)=>{
        const charge= await stripe.charges.create({
            amount:500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id
        });
        //setup automatically with passport, gain access to user
        req.user.credits +=5;
        const user = await req.user.save();
        res.send(user);
    })
};