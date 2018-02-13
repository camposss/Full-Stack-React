//write a function to retrieve a blob of json
//make an ajax request using fetch function
// http://rallycoding.herokuapp.com/api/music_albums
// function fetchAlbums(){
//     fetch('https://rallycoding.herokuapp.com/api/music_albums')
//         .then(res=> res.json())
//         .then(json=>console.log(json));
// }

 const fetchAlbums= async ()=>{
    const res =await fetch('https://rallycoding.herokuapp.com/api/music_albums');
    const json =await res.json();
    console.log(json);
}

fetchAlbums();


//go in and find this and update the object
//the second object we pass is the data we want to send back and update the database
//$inc mongo operator, helps us write slightly intelligent logic into the query; it means to increment either yes or no
// [choice] what's the value of the choice variable, we don't know at the time writing the code
//$ set one of the appropriate recipients in the subdocument collection to true
//this skips the process of fetching all of the data and going one by one. Mongo takes this, finds the match and updates it all in one
Survey.updateOne({
    id: surveyId,
    recipients: {
        $elemMatch:{email: email, responded: false}
    }
},{
    $inc: { [choice]:1 },
    $set: { 'recipients.$.responded': true }

});