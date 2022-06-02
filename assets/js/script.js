//DOM variables
//movie list box
var movieListEl = document.querySelector("#movie-info-card");
//INPUT for search box
var movieTitleSearchEl = document.querySelector("#movie-title");
//search button
var submitButtonEl = document.querySelector("#submit-button");

var imageCaptionEl = document.querySelector("#image-caption");

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
                movieTitleSearchEl.value = "";
                for (i = 0; i < data.Search.length; i++){
                    //displays the image
                    var moviePosterImageEl = document.createElement("img");
                    moviePosterImageEl.setAttribute("id", "image-" + i);
                    moviePosterImageEl.setAttribute("src", data.Search[i].Poster);
                    moviePosterImageEl.setAttribute("alt", data.Search[i].Title + " movie poster");

                    //creates linklink
                    var moviePosterLinkEl = document.createElement("a");
                    //makes the link and image
                    moviePosterLinkEl.setAttribute("href", "./movie-info.html?thisIMDBID=" + data.Search[i].imdbID);

                    //appends movies to list.
                    imageCaptionEl.textContent = "";
                    moviePosterLinkEl.appendChild(moviePosterImageEl)
                    movieListEl.appendChild(moviePosterLinkEl); 
                    
                }
               
            }).catch(function(err) {                
                    //alters text if nothing is found.
                    imageCaptionEl.textContent = "No content found";
            });
        }
    });
}


submitButtonEl.addEventListener("click", formSubmitMovie);

//Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

