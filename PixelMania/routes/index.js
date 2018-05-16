var express = require('express');
var router = express.Router();

/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/pixelsDB'); //Connects to a mongo database called "pixelsDB"

var scoreSchema = mongoose.Schema({ //Defines the Score Schema for this database
  Username: String,
  Score: Number
});

var Score = mongoose.model('Score', scoreSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
  console.log('Connected to database');
});

/* GET game page. */
router.get('/', function(req, res, next) {
	res.sendFile('index.html', { root:  'public' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
	res.sendFile('login.html', { root:  'public' });
});

/* GET highscores page. */
router.get('/highscores', function(req, res, next) {
	res.sendFile('highscores.html', { root:  'public' });
});

/* POST a score */
router.post('/addscore', function(req, res, next) {
  var newScore = new Score(req.body);
  newScore.save(true, function(err, post) {
    if (err) {
      return console.error(err);
    }
    res.sendStatus(200);
  });
});

/* GET high scores */
router.get('/gethighscores', function(req,res,next) {
	var query = Score.find().limit(10).select({Username:1,Score:1}).sort({Score:-1});
	query.exec(function(err,scores) {
			if (err) {
        return console.error(err);
			}
			res.json(scores);
	});
});

module.exports = router;
