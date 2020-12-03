var API_KEY = '6319ea28';

var elSearchForm = $_(".js-search-form");
var elSearchInput = $_(".js-movies-search", elSearchForm);
var elSearchBtn = $_(".js-search-button", elSearchForm);

var elSearchResults = $_(".search-results")

var searchResultTemplate = $_("#search-result-template").content;


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
    
    renderMoviesList(data.Search);

  });

})

elSearchBtn.addEventListener("click", function(evt) {
  
})


// var SEARCH_QUERY;
//var elBekorchiButton = document.querySelector('.bekorchi-button');

// elBekorchiButton.addEventListener('click', function() {
//   fetch(`http://omdbapi.com/?apikey=${API_KEY}&s=${SEARCH_QUERY}`).then(function (response) {
//     if (!response.ok) {
//       throw new Error(`Error ${response.status}: ${response.statusText}`);
//     }

//     return response.json();
//   }).then(function (data) {
//     console.log(data);
//     console.log(data.Search);
//     console.log(data.Search[0]);
//   });
// });
