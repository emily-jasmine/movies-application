import $ from "jquery";

export default () => {
    let movieCards = $('#movieCards');
    movieCards = '';

    movieCards.append(
        `<div class="card" style="width: 18rem;">
              <img class="card-img-top" src="" alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">Rating: ${movie.rating}</p>
                <a id="${movie.id}" class="btn btn-primary delete">Delete Movie</a>
              </div>
            </div>`)
}
