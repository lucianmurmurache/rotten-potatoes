const express = require('express'),
    bodyParser = require('body-parser'),
    uuid = require ('uuid');
const morgan = require('morgan');
const app = express();


// BodyParser
app.use(bodyParser.json());
// Movies
let Movies = [{
  title: 'The Godfather',
  released: '1972',
  length: '2h 55min',
  description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
  genre: 'Crime, Drama',
  director: 'Francis Ford Coppola',
  imageURL: 'https://www.imdb.com/title/tt0068646/mediaviewer/rm746868224'
},
{
  title: 'The Lord of the Rings: The Fellowship of the Ring',
  released: '2001',
  length: '2h 58min',
  description: 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
  genre: 'Adventure, Drama, Fantasy',
  director: 'Peter Jackson',
  imageURL: 'https://www.imdb.com/title/tt0120737/mediaviewer/rm3592958976'
},
{
  title: 'The Lord of the Rings: The Two Towers',
  released: '2002',
  length: '2h 59min',
  description: 'While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron\'s new ally, Saruman, and his hordes of Isengard.',
  genre: 'Adventure, Drama, Fantasy',
  director: 'Peter Jackson',
  imageURL: 'https://www.imdb.com/title/tt0167261/mediaviewer/rm2020826368'
},
{
  title: 'The Lord of the Rings: The Return of the King',
  released: '2003',
  length: '3h 21min',
  description: 'Gandalf and Aragorn lead the World of Men against Sauron\'s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.',
  genre: 'Adventure, Drama, Fantasy',
  director: 'Peter Jackson',
  imageURL: 'https://www.imdb.com/title/tt0167260/mediaviewer/rm584928512'
},
{
  title: 'The Dark Knight',
  released: '2008',
  length: '2h 32min',
  description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
  genre: 'Action, Crime, Drama',
  director: 'Christopher Nolan',
  imageURL: 'https://www.imdb.com/title/tt0468569/mediaviewer/rm4023877632'
},
{
  title: 'The Dark Knight Rises',
  released: '2012',
  length: '2h 58min',
  description: 'Eight years after the Joker\'s reign of anarchy, Batman, with the help of the enigmatic Catwoman, is forced from his exile to save Gotham City from the brutal guerrilla terrorist Bane.',
  genre: 'Action, Thriller',
  director: 'Christopher Nolan',
  imageURL: 'https://www.imdb.com/title/tt1345836/mediaviewer/rm834516224'
},
{
  title: 'Avengers: Infinity War',
  released: '2018',
  length: '2h 29min',
  description: 'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.',
  genre: 'Action, Adventure, Sci-Fi',
  director: 'Anthony and Joe Russo',
  imageURL: 'https://www.imdb.com/title/tt4154756/mediaviewer/rm4044245504'
},
{
  title: 'Saving Private Ryan',
  released: '1998',
  length: '2h 49min',
  description: 'Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.',
  genre: 'Drama, War',
  director: 'Steven Spielberg',
  imageURL: 'https://www.imdb.com/title/tt0120815/mediaviewer/rm1924732160'
},
{
  title: 'Gladiator',
  released: '2000',
  length: '2h 35min',
  description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',
  genre: 'Action, Adventure, Drama',
  director: 'Ridley Scott',
  imageURL: 'https://www.imdb.com/title/tt0172495/mediaviewer/rm2442542592'
},
{
  title: '12 Angry Men',
  released: '1957',
  length: '1h 36min',
  description: 'A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.',
  genre: 'Drama',
  director: 'Sidney Lumet',
  imageURL: 'https://www.imdb.com/title/tt0050083/mediaviewer/rm2927108352'

}]


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

// User registration
app.post('/users', (req, res) => {
  let newUser = req.body;

  if(!newUser.username) {
    const message = 'Username is required!';
    res.status(400).send(message);
  } else {
    res.send('User successfully added!');
  }
});

// Update user data
app.put('/users/:username/:password/:email/:dateofbirth', (req, res) => {
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

// Serves public folder
app.use(express.static('public'));
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// User deregistration
app.delete('/users/:username', (req, res) => {
  res.send('User successfully removed!');
});

// Listen for requests - port 8080
app.listen(8080);
