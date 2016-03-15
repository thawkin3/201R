var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root:  'public' });
});

/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/breakoutDB'); //Connects to a mongo database called "commentDB"

var userSchema = mongoose.Schema({ //Defines the Schema for this database
  Name: String,
  Email: String,
  Password: String
});

var user = mongoose.model('User', userSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
  console.log('Connected');
});

/* POST a user */
router.post('/user', function(req, res, next) {
  console.log("POST user route"); //[1]
  console.log(req.body); //[2]
  var newUser = new User(req.body); //[3]
  newUser.save(function(err, post) { //[4]
    if (err) return console.error(err);
    console.log(post);
    res.sendStatus(200);
  });
});

/* GET comments from database */
// router.get('/user', function(req, res, next) {
//   console.log("In the GET route");
//   Comment.find(function(err,commentList) { //Calls the find() method on your database
//     if (err) return console.error(err); //If there's an error, print it out
//     else {
//       console.log(commentList); //Otherwise console log the comments you found
//       res.json(commentList); //Then send them
//     }
//   })
// });

module.exports = router;
