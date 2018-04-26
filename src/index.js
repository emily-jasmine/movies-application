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

import {getMovies} from './api.js';

// getMovies().then((movies) => {
//   console.log('Here are all the movies:');
//   movies.forEach(({title, rating, id}) => {
//     console.log(`id#${id} - ${title} - rating: ${rating}`);
//   });
// }).catch((error) => {
//   alert('Oh no! Something went wrong.\nCheck the console for details.')
//   console.log(error);
// });


getMovies().then((movies) => {
    movies.forEach((movie) => {
        $('#movieCards').append(
            `<div class="card" style="width: 18rem;">
              <img class="card-img-top" src="" alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">Rating: ${movie.rating}</p>
                <a id="${movie.id}" class="btn btn-primary delete">Delete Movie</a>
              </div>
            </div>`)
        });
}).then(() => {
    $(".delete").on('click', function(event){
        event.preventDefault();
        var id = event.target.id;
        console.log(id);
        deleteMovie(id);
    });

}).catch(error => console.error(error));

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
        rating: ($('#newMovieRating').val().toString())})
});


