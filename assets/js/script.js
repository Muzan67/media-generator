//DOM variables
//movie list box
var movieListEl = document.querySelector("#movie-info-card");
//INPUT for search box
var movieTitleSearchEl = document.querySelector("#movie-title");
//search button
var submitButtonEl = document.querySelector("#submit-button");

//variable for what becomes the movie that the user inputs int he search box
var movieInput = null;

//Submission button - what happens when you hit submit button.
var formSubmitMovie = function(event) {
    event.preventDefault();
    movieInput = movieTitleSearchEl.value.trim();
    movieListEl.textContent= "";
    searchMovies(movieInput);
 }

 var searchMovies = function(movie) {
    var movieSearchApi = "https://www.omdbapi.com/?apikey=15745547&type=movie&s=" + movie;

    fetch(movieSearchApi).then(function(response) {
        //if request was successful:
        if(response.ok) {
            response.json().then(function(data) {
                //pass response data to DOM function
                console.log(data);
                //console.log(data.Search);
                
                for (i = 0; i < data.Search.length; i++){
                    //displays the image
                    var moviePosterImageEl = document.createElement("img");
                    moviePosterImageEl.setAttribute("id", "image-" + i);
                    moviePosterImageEl.setAttribute("src", data.Search[i].Poster);
                    moviePosterImageEl.setAttribute("alt", data.Search[i].Title + " movie poster");

                    //link
                    var moviePosterLinkEl = document.createElement("a");

                    var thisMovieID = i;


                    moviePosterLinkEl.setAttribute("href", "./movie-info.html?thisIMDBID=" + data.Search[thisMovieID].imdbID);

                    //appends movies to screen.
                  
                    moviePosterLinkEl.appendChild(moviePosterImageEl)
                    movieListEl.appendChild(moviePosterLinkEl); 
                    
                }
               
            }).catch(function(err) {                
                    alert("Movie not found!");
                
            });
        }
    });
}




submitButtonEl.addEventListener("click", formSubmitMovie);


