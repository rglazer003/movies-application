module.exports = {
  getMovies: () => {
    return fetch('http://localhost:1313/api/movies')
      .then(response => response.json());
  },
  addMovies: (newMovie) => {
      return fetch('http://localhost:1313/api/movies', {
        method: 'POST', header: {'Content-Type': 'application/json'}, body: JSON.stringify(newMovie)
      })

  }
};
