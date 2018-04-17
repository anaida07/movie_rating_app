var Movie = require("../models/Movie");
const Rating = require("../models/Rating");

module.exports.controller = (app) => {
  // fetch all movies
  app.get("/movies", function(req, res) {
    Movie.find({}, 'name description release_year genre', function (error, movies) {
      if (error) { console.log(error); }
       res.send({
        movies: movies
      })
    })
  })

  // fetch a single movie
  app.get("/api/movies/:id", function(req, res) {
    Movie.findById(req.params.id, 'name description release_year genre', function (error, movie) {
      if (error) { console.error(error); }
      res.send(movie)
    })
  })

  // rate a movie
  app.post('/movies/rate/:id', (req, res) => {
    const rating = new Rating({
      movie_id: req.params.id,
      user_id: req.body.user_id,
      rate: req.body.rate,
    })

    rating.save(function (error, rating) {
      if (error) { console.log(error); }
      res.send({
        movie_id: rating.movie_id,
        user_id: rating.user_id,
        rate: rating.rate
      })
    })
  })

  // add a new movie
  app.post('/movies', (req, res) => {
    const movie = new Movie({
      name: req.body.name,
      description: req.body.description,
      release_year: req.body.release_year,
      genre: req.body.genre
    })

    movie.save(function (error, movie) {
      if (error) { console.log(error); }
      res.send(movie)
    })
  })
}
