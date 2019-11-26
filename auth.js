var jwtSecret = 'your_jwt_secret'; // Must be the same key used in the JWTStrategy
var jwt = require('jsonwebtoken');
const passport = require('passport');
require('./passport'); // Local passport file

function generateJWTToken(user) {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, // The username that will be encoded in JWT
    expiresIn: '7d', //Token expires in 7 days
    algorithm: 'HS256' //Algorithm used to encode the values of JWT
  });
}

/* POST login */
module.exports = (router) => {
  router.post('/login', (req, res) => {
    passport.authenticate('local', { session : false}, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: 'Something has gone wrong!',
          user: user
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        var token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
}
