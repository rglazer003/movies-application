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

let movieArray = [];

function renderMovies() {
    $('#deck').html('');
    getMovies().then((movies) => {
        $('#deck').html('');
        movies.forEach(({title, rating, id, genre}) => {
            $('#deck').append(`<div class="card"><div><ul class="list-group list-group-flush"><li>ID: ${id}</li><li>Title: ${title}</li><li>Rating: ${rating}</li><li>Genre: ${genre}</li></ul></div></div>`)
        });
    })
}

function makeArray() {
    movieArray = [];
    getMovies().then((movies) => {
        movies.forEach(function (movie) {
            movieArray.push(movie)
        });
        console.log(movieArray);
        console.log(movieArray[0]);
    });
}

let textDump = '';

function searchMovies(e) {
    textDump += e.key.toLowerCase();
    let searchArray = [];
    movieArray.forEach(function (movie) {
        if (movie.title.toLowerCase().startsWith(textDump)) {
            searchArray.push(movie)
        }
    });
    console.log(searchArray);
    $('#deck').html('');
    searchArray.forEach(({title, rating, id, genre}) => {
        $('#deck').append(`<div class="card"><div><ul class="list-group list-group-flush"><li>ID: ${id}</li><li>Title: ${title}</li><li>Rating: ${rating}</li><li>Genre: ${genre}</li></ul></div></div>`)
    })


}

getMovies().then((movies) => {
    console.log('Here are all the movies:');
    movies.forEach(({title, rating, id, genre}) => {
        console.log(`id#${id} - ${title} - rating: ${rating}`);
        $('#deck').append(`<div class="card"><div><ul class="list-group list-group-flush"><li>ID: ${id}</li><li>Title: ${title}</li><li>Rating: ${rating}</li><li>Genre: ${genre}</li></ul></div></div>`)
    });
    $('.loading').addClass('hidden');
    $('#add-movie').removeClass('hidden');
    $('#movieEdit').removeClass('hidden');
    $('#deleteForm').removeClass('hidden');
    makeArray();
}).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.')
    console.log(error);
});

$('#add').on('click', function (e) {
    e.preventDefault();
    let movieName = $('#movie-name').val();
    let rating = $('#rating').val();
    let genre = $('#genre').val();
    $('#movie-name').val('');
    $('#rating').val('');
    $('#genre').val('')

    let newMovie = {title: movieName, rating: rating, genre: genre};
    console.log(newMovie);
    addMovies(newMovie).then(function () {
        console.log('It worked')
    }).catch(function () {
        console.log('Shit')
    });
    renderMovies();
    makeArray()
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

$('#movie-submit').on('click', function (e) {
    e.preventDefault();
    let movieName = $('#editTitle').val();
    let rating = $('#editRating').val();
    let newGenre = $('#editGenre').val();
    $('#editTitle').val('');
    $('#editRating').val('');
    $('#editGenre').val('');
    let movieData = {title: movieName, rating: rating, genre: newGenre};
    let editId = id;
    console.log(movieData);
    editMovie(editId, movieData)
        .then(console.log('It worked')).catch(console.log('Did not work'));
    renderMovies();
    makeArray()
});

$('#submitDelete').on('click', function (e) {
    e.preventDefault();
    let movieId = $('#deleteId').val();
    $('#deleteId').val('');
    console.log(movieId);
    deleteMovie(movieId).then(console.log('It worked')).catch(console.log('Nope'));
    renderMovies();
    makeArray();
});

$('#search').on('keypress', searchMovies);
$('#search').on('keyup' , function (e) {
    if (e.key === 'Backspace'){
        textDump = textDump.split('');
        textDump.pop();
        textDump = textDump.join('');
        if (textDump === ''){
            renderMovies()
        }
    }
});