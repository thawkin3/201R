var express = require('express');
var router = express.Router();

/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/commentDB'); //Connects to a mongo database called "commentDB"

var commentSchema = mongoose.Schema({ //Defines the Schema for this database
  Name: String,
  Comment: String
});

var Comment = mongoose.model('Comment', commentSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
  console.log('Connected to database');
});

/* POST a comment */
router.post('/comment', function(req, res, next) {
  var newcomment = new Comment(req.body); //[3]
  newcomment.save(function(err, post) { //[4]
    if (err) return console.error(err);
    res.sendStatus(200);
  });
});

/* GET comments from database */
router.get('/comments', function(req, res, next) {
  Comment.find(function(err,commentList) { //Calls the find() method on your database
    if (err) return console.error(err); //If there's an error, print it out
    else {
      res.json(commentList); //Then send them
    }
  })
});

module.exports = router;
