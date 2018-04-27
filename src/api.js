module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
      .then(response => response.json())
  },

  convertId: (id) => {
    return parseInt(id.split("_").pop());
  }


};



