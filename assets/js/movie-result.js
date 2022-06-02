//grab elements
var posterBoxEl = document.querySelector("#poster-box");
var posterImgEl = document.querySelector("#poster-img");
var movieTitleEl = document.querySelector("#movie-title");
var movieReleaseEl = document.querySelector("#movie-release");
var movieDirectorEl = document.querySelector("#movie-director");
var movieWriterEl = document.querySelector("#movie-writer");
var movieStarsEl = document.querySelector("#movie-stars");
var moviePlotEl = document.querySelector("#movie-plot");
var movieAwardsEl = document.querySelector("#movie-awards");
var favoritesButtonEl = document.querySelector("#add-to-favorites");
var movieInfoBox = document.querySelector("#movie-info");

var movieID = null;
var inFavorites = false;

//favorites
var favoritesArr = []; 
console.log(favoritesArr);

//needs to come from what the user clicked on
    //var chosenMovie = 
    //test purposes below
var chosenMovieTest = "Titanic"

var getMovieID = function() {
    //grab repo name from url query string
    var queryString = document.location.search;
    movieID = queryString.split("=")[1];

    console.log(movieID);
        getMovieInfo(movieID);
   
}

var getMovieInfo = function (movieID) {
 
    var movieTitleApi = "https://www.omdbapi.com/?apikey=15745547&type=movie&i=" + movieID;

    fetch(movieTitleApi).then(function(response) {
        //if request was successful:
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data);
                //pass response data to DOM function
                posterImgEl.setAttribute("src",data.Poster);
                posterImgEl.setAttribute("alt", data.Title + "poster");

                getMovieGifs(data.Title);

                movieTitleEl.textContent= data.Title;
                movieTitleText = data.Title
                movieReleaseEl.textContent = data.Released;
                movieDirectorEl.textContent = data.Director;
                movieWriterEl.textContent = data.Writer;
                movieStarsEl.textContent = data.Actors;
                moviePlotEl.textContent = data.Plot;
                movieAwardsEl.textContent = data.Awards;
            });
        }
        else {
            //direct to homepage if not successful
        //  document.location.replace("./index.html");
        }
    });
}


var saveToFavorites = function () {
    //adds movie ID to array
    favoritesArr.push(movieID);
    console.log(favoritesArr);
    //changes button text
    favoritesButtonEl.textContent="Added To favorites";
    //saves array in local storage
    localStorage.setItem("favoritesArr", JSON.stringify(favoritesArr)); 
}

var checkIfFavorited = function () {
    favoritesArr = JSON.parse(localStorage.getItem("favoritesArr"));
    //if favorites array is empty, save item to favorites
    if (favoritesArr === null) {
        console.log("empty array")
        favoritesArr = [];
        saveToFavorites();
    } else {
        //checks to make sure item isn't already in array
        for (var i = 0; i < favoritesArr.length; i++){
            //if the id is  equal to what's in the array,
            if (movieID === favoritesArr[i]){
                inFavorites = true;
                favoritesButtonEl.textContent="Already In Favorites";
                
            } 
        }
        //if, after looping through all items in array, the ID is not found in the favorites
        if (!inFavorites) {
            saveToFavorites();
        }
        
    }
    //disables buttons
    favoritesButtonEl.disabled = true;
}
//adds gifs to the bottom of the movie details div
var getMovieGifs = function (movieTitle) {

    var giphyApi = "https://api.giphy.com/v1/gifs/search?api_key=8E2MLmad1E3gk5mXH5xLiiNLcpIx3ddf&q=" + movieTitle + "&limit=10&offset=0&rating=pg-13&lang=en";

    fetch(giphyApi).then(function(response) {
        //if request was successful:
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data);
                //pass response data to DOM function
                //creates gif box el
                var gifBoxEl = document.querySelector("#gif-box");
                //loops through data to place the 10 gifs that were requested.
                //"10" is hard coded in because it's part of the API url, that could be changed easily.
                for (var i = 0; i < 10; i++){
                    var gifImgEl = document.createElement("img");
                    gifImgEl.setAttribute("src",data.data[i].images.original.url);
                    gifImgEl.setAttribute("alt", "gif: " + data.data[i].title);  
                    gifBoxEl.appendChild(gifImgEl);

                }
                    movieInfoBox.appendChild(gifBoxEl);
            });
        }
        else {
            
        }
    });
}

//gets the movie id, which leads to displaying the info
getMovieID();

favoritesButtonEl.addEventListener("click", checkIfFavorited);