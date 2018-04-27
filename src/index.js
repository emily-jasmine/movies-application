/**
 * es6 modules and imports
 */
import 'bootstrap'
import $ from 'jquery'



$(() => {
    $('[data-toggle="popover"]').popover()
});

import sayHello from './hello';
sayHello('World');

import addMovie from './addMovies.js';

import deleteMovie from './deleteMovie.js';

import editMovie from './editMovies.js';

import {getMovies, convertId, populateImage} from './api.js';

// getMovies().then((movies) => {
//   console.log('Here are all the movies:');
//   movies.forEach(({title, rating, id}) => {
//     console.log(`id#${id} - ${title} - rating: ${rating}`);
//   });
// }).catch((error) => {
//   alert('Oh no! Something went wrong.\nCheck the console for details.')
//   console.log(error);
// });

function generateCards() {
    let html = "";
    getMovies()
        .then((movies) => {
            movies.forEach((movie) => {
                html +=
                `<div class="card" style="width: 18rem;">
                    <img id="card-image" class="card-img-top" src="${populateImage(movie.genre)}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${movie.title}</h5>
                        <p class="card-text">Rating: ${movie.rating}</p>
                        <p class="card-text">Genre: ${movie.genre}</p>
                        <a id="${movie.id}" class="btn btn-danger delete">Delete Movie</a>
                        <a id="movie_${movie.id}" class="btn btn-primary edit">Edit Movie</a>
                    </div>
                </div>`
            });
            $('#movieCards').html(html);
        })
        .then(() => {
            $(".delete").on('click', function (event) {
                var id = event.target.id;
                event.preventDefault();
                deleteMovie(id);
            });
        })
        .then(() => {
            $('.edit').on('click', function(event) {
                let id = event.target.id;
                let movieId = convertId(id);
                $('.movieTitle').val("");
                let movieTitle = $(event.target).parent().children('h5').text();
                console.log(movieId);
                console.log(movieTitle);
                $('#addOrEdit').html('Edit A Movie');
                $('.movieTitle').addClass('editMovieTitle').val(movieTitle);
                $('.movieGenre').addClass('editMovieGenre');
                $('.movieRating').addClass('editMovieRating');
                $('#submitEdit').on('click', function() {
                    editMovie(movieId, {
                        title: ($('.movieTitle').val().toString()),
                        genre: ($('.movieGenre').val().toString()),
                        rating: ($('.movieRating').val().toString())
                    });
                    movieId = '';
                    $('#addOrEdit').html('Add A New Movie!');
                })
            })
        })
        .then(generateCards)
        .catch(error => console.error(error));
}

generateCards();

const showPage = () => {
    $('#loader').css('display','none');
    $('#myDiv').css('display','block')
};

const loadingTimer = () => {
  const loader = setTimeout(showPage, 3000)
};

$(document).ready(loadingTimer());

$('#submitNewMovie').on('click', function(){
    addMovie({title: ($('#newMovieTitle').val().toString()),
        genre: ($('#newMovieGenre').val().toString()),
        rating: ($('#newMovieRating').val().toString())});
    generateCards();
    $('#newMovieTitle').val('');
});



// $('#editMovieSubmit').on('click', function(){
//     console.log(event.target.id);
//     editMovie(id, movie);
// });


