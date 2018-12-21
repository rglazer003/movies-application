/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies, addMovies, getMovie} = require('./api.js');

const $ = require('jquery');

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
    $('.container').append(`<h1>${id} ${title} ${rating}</h1>`)
  });
  $('#loading').addClass('hidden');
  $('#add-movie').removeClass('hidden');
  $('#movieEdit').removeClass('hidden')
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});

$('#add').on('click', function(e) {
  e.preventDefault();
  let movieName = $('#movie-name').val();
    console.log(movieName);
  let rating = $('#rating').val();
  let newMovie = {title: movieName, rating: rating};
  console.log(newMovie);
  addMovies(newMovie).then(function () {
      console.log('It worked')
  }).catch(function () {
      console.log('Shit')
  })
});

$('#submitId').on('click', function (e) {
  e.preventDefault();
  let id = $('#editId').val();
  getMovie(id).then((movie) => {
    console.log(movie);
    $('#searchResult').html(`<h3>${movie.title}</h3><h3>${movie.rating}</h3>`)
  })
});



