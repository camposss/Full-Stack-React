//KEYS.JS FIGURE OUT WHAT SET OF CREDS TO RETURN

if (process.env.NODE_ENV==='production'){
    //we are in produk- return prod set of keys
    module.exports= require('./produk');

}else{
    //we are in dev
    module.exports= require('./dev');

}