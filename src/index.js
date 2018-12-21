/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies, addMovies, getMovie, editMovie, deleteMovie} = require('./api.js');

const $ = require('jquery');

function renderMovies() {
  $('.container').html('');
  getMovies().then((movies) => {
      movies.forEach(({title, rating, id}) => {
          $('.container').append(`<h1>ID: ${id}</h1><h1>Title: ${title}</h1><h1>Rating: ${rating}</h1><hr>`)
      })
  })
}



getMovies().then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id, genre}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
    $('.container').append(`<h1>ID: ${id}</h1><h1>Title: ${title}</h1><h1>Rating: ${rating}</h1><h1>Genre: ${genre}</h1><hr>`)
  });
  $('.loading').addClass('hidden');
  $('#add-movie').removeClass('hidden');
  $('#movieEdit').removeClass('hidden');
  $('#deleteForm').removeClass('hidden');
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});

$('#add').on('click', function(e) {
  e.preventDefault();
  let movieName = $('#movie-name').val();
    console.log(movieName);
  let rating = $('#rating').val();
  let genre = $('#genre').val();
  let newMovie = {title: movieName, rating: rating, genre: genre};
  console.log(newMovie);
  addMovies(newMovie).then(function () {
      console.log('It worked')
  }).catch(function () {
      console.log('Shit')
  });
    renderMovies();
});

let id = 0;
$('#submitId').on('click', function (e) {
  e.preventDefault();
  id = $('#editId').val();
  getMovie(id).then((movie) => {
    console.log(movie);
    $('#searchResult').html(`<h3>Title: ${movie.title}</h3><h3>Rating: ${movie.rating}</h3><h3>Genre: ${movie.genre}</h3>`)
  });
  $('#editForm').removeClass('hidden')
});

$('#movie-submit').on('click', function(e) {
  e.preventDefault();
  let movieName = $('#editTitle').val();
  let rating = $('#editRating').val();
  let movieData = {title: movieName, rating: rating}
  let editId = id
  console.log(movieData);
  editMovie(editId, movieData)
      .then(console.log('It worked')).catch(console.log('Did not work'))
    renderMovies();
});

$('#submitDelete').on('click', function (e) {
  e.preventDefault();
  let movieId = $('#deleteId').val();
  console.log(movieId);
  deleteMovie(movieId).then(console.log('It worked')).catch(console.log('Nope'))
    renderMovies();
});

