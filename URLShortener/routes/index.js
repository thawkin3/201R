var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root:  'public' });
});

/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/urlDB'); //Connects to a mongo database called "urlDB"

var urlSchema = mongoose.Schema({ //Defines the Url Schema for this database
  originalURL: String,
  newURL: String
});

var Url = mongoose.model('Url', urlSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
  console.log('Connected');
});

/* GET page with URL parameter */
router.get('/:url', function(req, res, next) {
  var url = req.params.url;
  // findUserByUsername(username, function(error, user) {
    // if (error) return next(error);
    // return res.status(200).send(url);
  // });

	Url.findOne({ originalURL: url }, function(err, foundURL) {
	    if (err) return next(err);
		if (foundURL == null) {
		  	var newURL = new Url({ originalURL: url, newURL: "localhost:3000/itWorked" }); //[3]
		    console.log(newURL);
		  	newURL.save(true, function(err, post) { //[4]
		    	if (err) return console.error(err);
		    	console.log("found the URL");
		    	res.sendStatus(200);
		  	});
		} else {
			res.status(200).send({originalURL: url, newURL: 'thisIsTheNewUrl'});
		}
	});
});

module.exports = router;
