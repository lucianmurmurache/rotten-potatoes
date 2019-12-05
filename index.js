const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
//const uuid = require ('uuid');
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

const passport = require('passport');
require('./passport');

//Express-validator
const { check, validationResult } = require('express-validator');

//Cors
const cors = require('cors');
var allowedOrigins = ['http://localhost:8080' , 'https://rotten-potatoes3000.herokuapp.com' , 'http://herokuapp.com' , 'https://mongodb.com' , 'https://cloud.mongodb.com'];
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){ // If an origin is not on the list of allowed origins
      var message = 'The CORS policy for this application does not allow access from origin ' + origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));

// mongoose.connect('mongodb://localhost:27017/RottenPotatoes', {useNewUrlParser: true});
mongoose.connect('mongodb+srv://rottenpotatoes:rottenpotatoes3000@cluster0-0yhnp.mongodb.net/RottenPotatoes?retryWrites=true&w=majority', {useNewUrlParser: true});

// log requests using morgan
app.use(morgan('common'));

// BodyParser
app.use(bodyParser.json());
// Import auth.js
var auth = require('./auth')(app);

// Default textual response
app.get('/', function(req, res) {
  res.send('Welcome to Rotten Potatoes!')
});

// GET full movie list
app.get('/movies', passport.authenticate('jwt', { session: false }), function(req, res) {
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
app.get('/movies/:title', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({
    title : req.params.title
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
app.get('/movies/genres/:name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({
    'genre.name' : req.params.name
  })
  .then(function(movies) {
    res.status(201).json(movies.genre)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err)
  });
})

// GET data about director
app.get('/movies/directors/:name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({
    'director.name' : req.params.name
  })
  .then(function(movies) {
    res.status(201).json(movies.director)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// User registration
app.post('/user',
  [
    check('username', 'Username too short or missing, try again').isLength({min: 5}),
    check('username' , 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('password', 'Password missing or is smaller than 8 characters.').isLength({min: 8}).not().isEmpty(),
    check('email' , 'Email does not appear to be valid').isEmail()
  ], (req, res) => {
    // Check validation object for errors
    var errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array()
      });
    }
    var hashedPassword = Users.hashpassword(req.body.password);
    Users.findOne({ username: req.body.username })
    .then(function(user) {
      if(user) {
        return res.status(400).send(req.body.username + " already used!");
      } else {
        Users.create({
          username: req.body.username,
          password: hashedPassword,
          email: req.body.email,
          birthday: req.body.birthday
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
app.put('/user/:username', passport.authenticate('jwt', { session: false }),
[
  check('username', 'Username too short or missing, try again').isLength({min: 5}),
  check('username' , 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
  check('password', 'Password missing or is smaller than 8 characters.').isLength({min: 8}).not().isEmpty(),
  check('email' , 'Email does not appear to be valid').isEmail()
], (req, res) =>  {
  Users.findOneAndUpdate(
    { username : req.params.username},
    { $set : {
    username : req.body.username,
    password : req.body.password,
    email : req.body.email,
    birthday : req.body.birthday
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
app.post('/user/:username/movies/:movieID', passport.authenticate('jwt', { session: false }), function(req, res) {
  Users.findOneAndUpdate(
    { username : req.params.username},
    { $push : { favourites : req.params.movieID } },
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
app.delete('/user/:username/movies/:movieID', passport.authenticate('jwt', { session: false }), function(req, res) {
  Users.findOneAndUpdate(
    { username : req.params.username},
    { $pull : { favourites : req.params.movieID } },
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
app.delete('/user/:username', passport.authenticate('jwt', { session: false }), function(req, res) {
  Users.findOneAndRemove(
    { username: req.params.username })
    .then(function(user) {
      if(!user) {
        res.status(400).send(req.params.username + " not found!");
      } else {
        res.status(200).send(req.params.username + " successfully deleted!");
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

// Listen for requests - process.env.PORT
var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
  console.log("Listening on Port 3000");
});
