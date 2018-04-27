module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
      .then(response => response.json())
  },

  convertId: (id) => {
    return parseInt(id.split("_").pop());
  },

  populateImage: (genre) => {
    //let genre = $('#newMovieGenre').val();
      console.log(genre);
      switch (genre) {
        case "Action":
          return "/img/action.png";
        case "Adventure":
          return "/img/adventure.png";
        case "Comedy":
          return "/img/comedy.png";
        case "Drama":
          return "/img/drama.png";
        case "Horror":
          return "/img/horror.png"
    }
  },

    capitalize: (input) => {
    input = input.toString();
    var first = input[0].toUpperCase();
    var rest = input.substring(1).toLowerCase();
    return first + rest;
  },


};



