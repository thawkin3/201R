var express = require('express');
var router = express.Router();

/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); // Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/passportDB'); // Connects to a mongo database called "passportDB"

var userSchema = mongoose.Schema({ // Defines the User Schema for this database
  username: String,
  password: String
});

var User = mongoose.model('User', userSchema); // Makes an object from that schema as a model

/* Authentication with passport */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root:  'public' });
});

/* GET login page */
router.get('/login', function(req, res, next) {
  res.sendFile('login.html', { root:  'public' });
});

router.post('/login', passport.authenticate('local', { 
  	successRedirect: '/',
  	failureRedirect: '/login',
  	failureFlash: true 
  })
);

module.exports = router;
