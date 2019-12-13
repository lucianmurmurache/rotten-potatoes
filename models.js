const mongoose = require('mongoose');

const bcryptjs = require('bcryptjs');

var movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  genre: {
    name: String,
    description: String
  },
  director: {
    name: String,
    bio: String
  },
  actors: [String],
  imagePath: String,
  featured: Boolean
});

var userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  birthday: Date,
  favourites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'movies'
  }]
});
// Hash password entered when registering, before it is stored in MongoDB.
userSchema.statics.hashPassword = function (password) {
  return bcryptjs.hashSync(password, 10);
};

userSchema.methods.validatePassword = function (password) {
  return bcryptjs.compareSync(password, this.password);
};

var Movie = mongoose.model('Movie', movieSchema);
var User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;