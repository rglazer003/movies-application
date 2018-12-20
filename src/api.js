module.exports = {
  getMovies: () => {
    return fetch('http://localhost:1313/api/movies')
      .then(response => response.json());
  }
};
