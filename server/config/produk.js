//this is produk keys here

//allows to export this function so it can be required by other files. Similar to react export function

//dev. js do commit this to heroku

module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    mongoURI: process.env.MONGO_URI,
    cookieKey: process.env.COOKIE_KEY

}

//console.log(' mongodb://root:rootpassword@ds131698.mlab.com:31698/emaily-produk')
