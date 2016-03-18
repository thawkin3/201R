var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root:  'public' });
});

/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/breakoutDB'); //Connects to a mongo database called "breakoutDB"

var userSchema = mongoose.Schema({ //Defines the User Schema for this database
  Name: String,
  Email: String,
  Password: String
});

var User = mongoose.model('User', userSchema); //Makes an object from that schema as a model

var scoreSchema = mongoose.Schema({ //Defines the Score Schema for this database
  Name: String,
  Score: Number
});

var Score = mongoose.model('Score', scoreSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
  console.log('Connected');
});

/* POST a user */
router.post('/adduser', function(req, res, next) {
  console.log("POST adduser route"); //[1]
  console.log(req.body); //[2]

  User.findOne({ Email: req.body.Email }, function(err, user) {
	  console.log(user);
	  if (user == null) {
		  var newUser = new User(req.body); //[3]
  	      console.log(newUser);
  	  	  console.log(req.body.Email);
		  newUser.save(true, function(err, post) { //[4]
		    if (err) return console.error(err);
		    console.log(post);
		    res.sendStatus(200);
		  });
	  } else {
	  	res.sendStatus(500);
	  }

  });
});

router.get('/getHighScores', function(req,res,next) {
	console.log("In high score DB");
	Score.find({},
	//['Name','Score'],
	{
	    limit: 10, // Ending Row
	    sort: { Score: -1 },
	    fields: {Name: 1, Score: 1}
	},
		function(err,scores){
			if (err) return console.error(err); //If there's an error, print it out
			else {
			    console.log(scores); //Otherwise console log the comments you found
			    res.json(scores).sendStatus(200); //Then send them
			}
		}
	);

});


/* GET (fake POST) a user */
router.post('/getuser', function(req, res, next) {
  console.log("POST getuser route"); //[1]
  console.log(req.body); //[2]
  console.log(req.body.Email);

  User.findOne({ Email: req.body.Email }, function(err, user) {
	  console.log(user);
	  if (user !== null) {
		if (user.Password == req.body.Password) {
			console.log("found you!");
		    res.sendStatus(200);
		} else {
			res.sendStatus(500);
		}
	  } else {
		res.sendStatus(400);
	  }
  });
});

/* POST a score */
router.post('/addscore', function(req, res, next) {
  console.log("POST addscore route"); //[1]
  console.log(req.body); //[2]

  var newScore = new Score(req.body); //[3]
  console.log(newScore);
  console.log(req.body.Score);
  
  newScore.save(true, function(err, post) { //[4]
    if (err) return console.error(err);
    console.log(post);
    res.sendStatus(200);
  });
});



module.exports = router;
