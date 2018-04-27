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
    //   console.log(genre);
      switch (genre) {
        case "Action":
          return "/img/action.png";
        case "Animated":
          return "/img/animated.png";
        case "Comedy":
          return "/img/comedy.png";
        case "Drama":
          return "/img/drama.png";
        case "Horror":
          return "/img/horror.png";
        case "Romance":
          return "/img/romance.png";
        case "Sci-Fi":
          return "/img/scifi.png";
        case "Western":
          return "/img/western.png"
    }
  },
    populateStars: (rating) => {
        //let genre = $('#newMovieGenre').val();
        // console.log(rating);
        switch (rating) {
            case "1":
                return "⭐";
            case "2":
                return "⭐⭐";
            case "3":
                return "⭐⭐⭐";
            case "4":
                return "⭐⭐⭐⭐";
            case "5":
                return "⭐⭐⭐⭐⭐"
        }
    },


    capitalize: (input) => {
    input = input.toString();
    var first = input[0].toUpperCase();
    var rest = input.substring(1).toLowerCase();
    return first + rest;
  },




};



