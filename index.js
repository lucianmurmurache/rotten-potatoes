const express = require('express');
const bodyParser = require('body-parser');
const uuid = require ('uuid');
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
  res.send('Welcome to RottenPotatoes!')
});

// GET full movie list
app.get('/movies', function(req, res) {
  Movies.find()
    .then(function(movies) {
      res.status(201).json(movies)
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//GET movie by name
app.get('/movies/:Title', (req, res) => {
  Movies.findOne({
    Title : req.params.Title
  })
  .then(function(movie) {
    res.status(201).json(movie)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err)
  });
});

// GET movie by genre name
app.get('/movies/genres/:Name', (req, res) => {
  Movies.findOne({
    'Genre.Name' : req.params.Name
  })
  .then(function(movies) {
    res.status(201).json(movies.Genre)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err)
  });
})

// GET data about director
app.get('/movies/directors/:Name', (req, res) => {
  Movies.findOne({
    'Director.Name' : req.params.Name
  })
  .then(function(movies) {
    res.status(201).json(movies.Director)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// User registration
app.post('/users', function(req, res) {
  Users.findOne({ Username: req.body.Username })
  .then(function(user) {
    if(user) {
      return res.status(400).send(req.body.Username + " already used!");
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

// Update user data by username
app.put('/users/:Username', function(req, res) {
  Users.findOneAndUpdate({
    Username : req.params.Username},
    { $set : {
    Username : req.body.Username,
    Password : req.body.Password,
    Email : req.body.Email,
    Birthday : req.body.Birthday
    }},
    { new : true}, // This makes sure the updated document is returned
    function(err, updatedUser) {
     if(err) {
       console.error(err);
       res.status(500).send("Error: " + err);
     } else {
         res.json(updatedUser)
     }
   })
});

// Add movie to user favourite list
app.post('/users/:Username/Movies/:MovieID', function(req, res) {
  Users.findOneAndUpdate({
    Username : req.params.Username},
    { $push : { Favorites : req.params.MovieID}},
    { new : true}, // This makes sure the updated document is returned
    function(err, updatedUser) {
      if(err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser)
      }
    })
});

// Detele movie from user favourite list
app.delete('/users/:Username/Movies/:MovieId', function(req, res) {
  Users.findOneAndRemove({
    Username : req.params.Username},
    { $push : { Favorites : req.params.MovieId}},
    { new : true}, // This makes sure the updated document is returned
    function(err, updatedUser) {
      if(err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser)
      }
    })
});

// User deregistration
app.delete('/users/:Username', function(req, res) {
  Users.findOneAndRemove({
    Username: req.params.Username
  })
    .then(function(user) {
      if(!user) {
        res.status(400).send(req.params.Username + " not found!");
      } else {
        res.status(200).send(req.params.Username + " successfully deleted!");
      }
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Serves public folder
app.use(express.static('public'));
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Listen for requests - port 8080
app.listen(8080);
