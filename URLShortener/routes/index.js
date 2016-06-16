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
  	var theParamUrl = req.params.url;
  	console.log("inside the route, and here's the url: " + theParamUrl);

	Url.findOne({ originalURL: theParamUrl }, function(err, foundURL) {
	    if (err) return err;
		console.log("inside the findOne method, and here's the search results:");
		console.log(foundURL);
		if (foundURL == null) {
		  	var jsonRecord = {
		  		originalURL: theParamUrl,
		  		newURL: "localhost:3000/itWorked"
		  	};
		  	console.log("jsonRecord is: ");
		  	console.log(jsonRecord);

		  	var newURL = new Url(jsonRecord, false); //[3]
		  	console.log("newURL is: ");
		    console.log(newURL);

			res.status(200).json(jsonRecord);

		  	
		  // 	newURL.save(true, function(err, savedURL) { //[4]
		  //   	console.log("inside the save method");
		  //   	if (err) return console.error(err);
		  // 		console.log("savedURL is: ");
		  //   	console.log(savedURL);
				// res.status(200).json(jsonRecord);
		  // 	});
		} else {
			console.log("found the URL");
			res.status(200).json(foundURL);
		}
	});
});

module.exports = router;
