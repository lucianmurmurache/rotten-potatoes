const express = require('express');
const morgan = require('morgan');
const app = express();

// Top (10) movies
let topMovies = [{
  title: 'The Godfather',
  director: 'Francis Ford Coppola'
},
{
  title: 'The Lord of the Rings: The Fellowship of the Ring',
  director: 'Peter Jackson'
},
{
  title: 'The Lord of the Rings: The Two Towers',
  director: 'Peter Jackson'
},
{
  title: 'The Lord of the Rings: The Return of the King',
  director: 'Peter Jackson'
},
{
  title: 'The Dark Knight',
  director: 'Christopher Nolan'
},
{
  title: 'The Dark Knight Rises',
  director: 'Christopher Nolan'
},
{
  title: 'Avengers: Infinity War',
  director: 'Anthony and Joe Russo'
},
{
  title: 'Saving Private Ryan',
  director: 'Steven Spielberg'
},
{
  title: 'Gladiator',
  director: 'Ridley Scott'
},
{
  title: '12 Angry Men',
  director: 'Sidney Lumet'
}]

// log requests using morgan
app.use(morgan('common'));

// Get
app.get('/movies', function(req, res) {
  res.json(topMovies)
});

// Default textual response
app.get('/', function(req, res) {
  res.send('Welcome to Rotten Potatoes!')
});
// Serves public folder
app.use(express.static('public'));
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Dang it, something broke!');
});

// Listen for requests - port 8080
app.listen(8080);
