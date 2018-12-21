module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
      .then(response => response.json());
  },
  addMovies: (newMovie) => {
      console.log(newMovie);
      return fetch('/api/movies', {
        method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(newMovie)
      })

  }
};
