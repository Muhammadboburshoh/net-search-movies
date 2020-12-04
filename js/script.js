var API_KEY = '6319ea28';

var moviesArray = [];

var elSearchForm = $_(".js-search-form");
var elSearchInput = $_(".js-movies-search", elSearchForm);
var elSearchBtn = $_(".js-search-button", elSearchForm);

var elSearchResults = $_(".search-results");

var movieResultInfo = $_(".movie-about");


var searchResultTemplate = $_("#search-result-template").content;

var elMovieEboutTemplate = $_("#movie-about-template").content;


var createResultMovie = function(movie) {

  var searchResult = searchResultTemplate.cloneNode(true);

    $_(".js-result-movie-title", searchResult).textContent = movie.Title;
    $_(".js-info-button", searchResult).dataset.imdbId = movie.imdbID   

  return searchResult;
}

var renderMoviesList = function (moviesArray) {
  elSearchResults.innerHTML = '';
  var elMoviesFragment = document.createDocumentFragment();

  moviesArray.forEach(function (todo) {
    elMoviesFragment.appendChild(createResultMovie(todo));
  });

  elSearchResults.appendChild(elMoviesFragment);
};


elSearchForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  
  var searchInput = elSearchInput.value.trim();
  
  
  fetch(`http://omdbapi.com/?apikey=${API_KEY}&s=${searchInput}`).then(function (response) {
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    return response.json();
  }).then(function (data) {
    
    
    if(data.Response === "False") {
      alert("Xato nateja");
      return;
    }
    
    moviesArray = data.Search;

    renderMoviesList(moviesArray);
  });

})

var renderMovieInfo = function(movie) {
  movieResultInfo.innerHTML = "";
  var movieEbout = elMovieEboutTemplate.cloneNode(true);

  $_(".movie-img", movieEbout).src = movie.Poster;
  $_(".movie-about-title", movieEbout).textContent = movie.Title;
  $_(".movie-year", movieEbout).textContent += movie.Year;

  movieResultInfo.appendChild(movieEbout);
}


elSearchResults.addEventListener("click", function(evt) {
  if(evt.target.matches(".js-info-button")) {
    moviesArray.forEach(function(movie) {
      if(movie.imdbID === evt.target.dataset.imdbId) {
        renderMovieInfo(movie);
      }
    })
  }
})

