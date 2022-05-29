//if favoritesArr is empty, display "Your favorites list is empty!"
//else display favorites and a button to remove them from favorites

var allMoviesBoxEl = document.querySelector("#favorite-movies");
var favoritesArr = [];



var displayFavorites = function() {
    favoritesArr = JSON.parse(localStorage.getItem("favoritesArr"));
    
    if (favoritesArr === null) {
        moviesBoxEl.textContent = "You have no favorites right now.";
    } else {

        for (var i = 0; i < favoritesArr.length; i++) {
            fetchMovieData(favoritesArr[i]);
            
        }

    }
}

var removeMovie = function () {
    for (var i = 0; favoritesArr.length; i++) {
        if (this.id === favoritesArr[i]) {
            favoritesArr.splice(i, 1);
            return;
        }    
    }
    console.log(favoritesArr);
    localStorage.setItem("favoritesArr", JSON.stringify(favoritesArr)); 
    this.disabled() = true;
        
}

var fetchMovieData = function (movieID){
    var movieIDApi = "https://www.omdbapi.com/?apikey=15745547&type=movie&i=" + movieID;
    
    fetch(movieIDApi).then(function(response) {
        //if request was successful:
        if(response.ok) {
            response.json().then(function(data) {
                
                //display image
                var oneMovieBoxEl = document.createElement("div");
                oneMovieBoxEl.setAttribute("id", "movie-box");

                var moviePosterEl = document.createElement("img");
                moviePosterEl.setAttribute("src", data.Poster);
                moviePosterEl.setAttribute("alt", data.Title + " poster");
                //display title
                var movieTitleEl = document.createElement("h3");
                movieTitleEl.textContent = data.Title;
                
                
                
                //remove movie button
                var removeMovieButton = document.createElement("button");
                removeMovieButton.textContent= "Remove " + data.Title + " from Favorites";
                removeMovieButton.setAttribute("id", movieID);
                
                
                oneMovieBoxEl.appendChild(moviePosterEl);
                oneMovieBoxEl.appendChild(movieTitleEl);
                oneMovieBoxEl.appendChild(removeMovieButton);
                allMoviesBoxEl.appendChild(oneMovieBoxEl)
                
                //removeMovieButton.addEventListener("click", removeMovie)


            });
        
        }
    });
}

displayFavorites();

