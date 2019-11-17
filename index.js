const express = require('express'),
    bodyParser = require('body-parser'),
    uuid = require ('uuid');
const morgan = require('morgan');
const app = express();

const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/RottenPotatoes', {useNewUrlParser: true});

// BodyParser
app.use(bodyParser.json());

// log requests using morgan
app.use(morgan('common'));

// Default textual response
app.get('/', function(req, res) {
  res.send('Welcome to Rotten Potatoes!')
});

// GET full movie list
app.get('/movies', function(req, res) {
  res.json(Movies);
  res.send('GET request successfully returning data on all movies!');
});

//GET movie by name
app.get('/movies/:title', (req, res) => {
  res.send('GET request successfully returning data on movie by title!');
});

//GET movie by release year
app.get('/movie/:release', (req, res) => {
  res.send('GET request successfully returning data on movies by release year!')
})

// GET movie by genre name
app.get('/genre/:name', (req, res) => {
  res.send('GET request successfully returning data on movie genre!');
})

// GET data about director
app.get('/directors/:name', (req, res) => {
  res.send('GET request successfully returning data on director by name!');
});

// User registration [ Add a user (JSON is expected in this format ) ]
app.post('/users', function(req, res) {
  Users.findOne({ Username: req.body.Username })
  .then(function(user) {
    if(user) {
      return res.status(400).send(req.body.Username + "already exists");
    } else {
      Users.create({
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      })
      .then(function(user) {res.status(201).json(user) })
      .catch(function(error) {
        console.error(error);
        res.status(500).send("Error: " + error);
      })
    }
  }).catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});


//Old user registration
/*app.post('/users', (req, res) => {
  let newUser = req.body;

  if(!newUser.username) {
    const message = 'Username is required!';
    res.status(400).send(message);
  } else {
    res.send('User successfully added!');
  }
});
*/
// Update user data
app.put('/users/:username/:password/:email/:birthday', (req, res) => {
  res.send('User data updated!');
});

// Add movie to user favourite list
app.post('/favorites/:username/:title', (req, res) => {
  res.send('Movie added to favourite list!');
});

// Detele movie from user favourite list
app.delete('/favorites/:username/:title', (req, res) => {
  res.send('Movie removed from favourite list!');
});

// User deregistration
app.delete('/users/:username', (req, res) => {
  res.send('User successfully removed!');
});

// Serves public folder
app.use(express.static('public'));
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Listen for requests - port 8080
app.listen(8080);
