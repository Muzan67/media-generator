//if favoritesArr is empty, display "Your favorites list is empty!"
//else display favorites and a button to remove them from favorites

var allMoviesBoxEl = document.querySelector("#favorite-movies");
var favoritesArr = [];
var arrayNumber = null;


var displayFavorites = function() {
    favoritesArr = JSON.parse(localStorage.getItem("favoritesArr"));
    
    if (favoritesArr === null || favoritesArr.length === 0) {
        var noMoviesEl = document.createElement("h2");
        noMoviesEl.textContent = "You have not added any favorites yet.";
        allMoviesBoxEl.appendChild(noMoviesEl);
    } else {
        
        for (var i = 0; i < favoritesArr.length; i++) {
            arrayNumber = i;
            fetchMovieData(favoritesArr[i]);
            
        }

    }
}

var removeMovie = function (movieID) {
    console.log("remove movie function started")
    for (var i = 0; favoritesArr.length; i++) {
        if (movieID === favoritesArr[i]) {
            console.log("found name")
            favoritesArr.splice(i, 1);
            localStorage.setItem("favoritesArr", JSON.stringify(favoritesArr)); 
            return;
        }    
    }
    
    
        
}

var fetchMovieData = async (movieID) => {
    var movieIDApi = "https://www.omdbapi.com/?apikey=15745547&type=movie&i=" + movieID;
    
 await fetch(movieIDApi).then(function(response) {
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
                //removeMovieButton.setAttribute("name", "button" + arrayNumber);
                
                oneMovieBoxEl.appendChild(moviePosterEl);
                oneMovieBoxEl.appendChild(movieTitleEl);
                oneMovieBoxEl.appendChild(removeMovieButton);
                allMoviesBoxEl.appendChild(oneMovieBoxEl)
                
                removeMovieButton.addEventListener("click", function () {
                    var idnumber = this.getAttribute("id");
                    console.log("the id is " + idnumber)
                    removeMovie(idnumber);
                    document.getElementById(idnumber).disabled = true;
                })

            });
        
        }
    });
}

displayFavorites();

                

