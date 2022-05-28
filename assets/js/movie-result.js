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

var thisIMDBID= null;

//needs to come from what the user clicked on
    //var chosenMovie = 
    //test purposes below
var chosenMovieTest = "Titanic"

var getMovieID = function() {
    //grab repo name from url query string
    var queryString = document.location.search;
    var movieID = queryString.split("=")[1];

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

                movieTitleEl.textContent= data.Title;
                movieReleaseEl.textContent = data.Released;
                movieDirectorEl.textContent = data.Director;
                movieWriterEl.textContent = data.Writer;
                movieStarsEl.textContent = data.Starring;
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

getMovieID();