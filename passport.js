//Local Strategy
const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  Models = require('./models.js'),
  passportJWT = require('passport-jwt');

let Users = Models.User;
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    (username, password, callback) => {
      console.log(username + ' ' + password);
      Users.findOne(
        {
          username: username,
        },
        (error, user) => {
          if (error) {
            console.log(error);
            return callback(error);
          }
          if (!user) {
            console.log('Incorrect username');
            return callback(null, false, {
              message: 'Incorrect username or password!',
            });
          }
          if (!user.validatePassword(password)) {
            //Hash password before it is stored in MongoDB
            console.log('incorrect password');
            return callback(null, false, {
              message: 'Incorrect password!',
            });
          }
          console.log('finished');
          return callback(null, user);
        },
      );
    },
  ),
);

//JWT Strategy.
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_jwt_secret',
    },
    (jwtPayload, callback) => {
      return Users.findById(jwtPayload._id)
        .then((user) => {
          return callback(null, user);
        })
        .catch((error) => {
          return callback(error);
        });
    },
  ),
);
