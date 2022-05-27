//hey Avengers - quick tip: hit (on Mac) option + z to make it so the text wraps, instead of extends out the window - then you won't have to scroll horizontally.


//var searchInputEl

var movieApi = "http://www.omdbapi.com/?apikey=15745547&type=movie&t=titanic";

var getMovieInfo = function () {

    fetch(movieApi).then(function(response) {
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

getMovieInfo();