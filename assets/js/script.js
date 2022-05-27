//hey Avengers - quick tip: hit (on Mac) option + z to make it so the text wraps, instead of extends out the window - then you won't have to scroll horizontally.


// var timestamp = new Date().getTime();

//var PRIV_KEY = "715c0809fae05a29f8e481a2f7b1bfa5341f6f9a";

//var PUBLIC_KEY = "ef6e7e667ad6b2c4b1d7956ea5b7281e";


// var hash = CryptoJS.MD5(timestamp + PRIV_KEY + PUBLIC_KEY).toString();

var marvelApiUrl = "http://gateway.marvel.com/v1/public/comics?apikey=ef6e7e667ad6b2c4b1d7956ea5b7281e";


var getSuperHeroInfo = function () {

    fetch(marvelApiUrl).then(function(response) {
        //if request was successful:
        if(response.ok) {
            response.json().then(function(data) {
                //pass response data to DOM function
                console.log(data)
            });
        }
        else {
            //direct to homepage if not successful
        //  document.location.replace("./index.html");
        }
    });

}

var testPayload = {
    name: 'spiderman',
    identity: 'Peter Parker',
    bio: "Peter Parker was bitten by a radioactive spider, and now fights for New York City, and sometimes... the world",
    // NOTE: This is how images are used for marvel Api: https://developer.marvel.com/documentation/images 
    image: "image goes here"
};

console.log(testPayload);