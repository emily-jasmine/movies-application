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

import {getMovies, convertId} from './api.js';

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
                    <img class="card-img-top" src="" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${movie.title}</h5>
                        <p class="card-text">Rating: ${movie.rating}</p>
                        <a id="${movie.id}" class="btn btn-primary delete">Delete Movie</a>
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
                console.log(id);
                deleteMovie(id);
            });
        })
        .then(() => {
            $('.edit').on('click', function(event) {
                const id = event.target.id;
                const movieId = convertId(id);
                console.log(movieId);
                $('#addOrEdit').html('Edit A Movie');
                $('#newMovieTitle').toggleClass('editMovieTitle');
                $('#newMovieGenre').toggleClass('editMovieGenre');
                $('#newMovieRating').toggleClass('editMovieRating');
                $('#submitMovie').toggleClass('submitEditedMovie');
                $('#submitEditedMovie').on('click', function() {
                    editMovie(movieId, {
                        title: ($('#editMovieTitle').val().toString()),
                        genre: ($('#editMovieGenre').val().toString()),
                        rating: ($('#editMovieRating').val().toString())
                    })
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

$('#submitMovie').on('click', function(){
    addMovie({title: ($('#newMovieTitle').val().toString()),
        genre: ($('#newMovieGenre').val().toString()),
        rating: ($('#newMovieRating').val().toString())});
    generateCards();
});



// $('#editMovieSubmit').on('click', function(){
//     console.log(event.target.id);
//     editMovie(id, movie);
// });


