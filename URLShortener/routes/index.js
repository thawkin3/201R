var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root:  'public' });
});

/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); // Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/urlDB'); // Connects to a mongo database called "urlDB"

var urlSchema = mongoose.Schema({ // Defines the Url Schema for this database
  originalURL: String,
  lookupNumber: Number
});

var Url = mongoose.model('Url', urlSchema); // Makes an object from that schema as a model

var db = mongoose.connection; // Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); // Checks for connection errors
db.once('open', function() { // Lets us know when we're connected
  console.log('Connected to database');
});

/* GET page to enter a new URL */
router.get('/new/:url(*)', function(req, res, next) {
  	var theParamUrl = req.params.url;

  	if (theParamUrl == "") {
  		res.status(200).send("Please enter a URL after 'new/'");
  	} else {

	  	// Try to find the URL in your database
		Url.findOne({ originalURL: theParamUrl }, function(err, foundURL) {
		    if (err) return err;

			// If it wasn't found, then this is a new URL
			if (foundURL == null) {
			  	
				// We'll need to make a new entry and assign it a new number
				var chooseANumber;

				// Look for the highest number in the database, and add 1 to that number
				Url.findOne({}).sort('-lookupNumber').exec(function(err, foundNumber) {
					if (foundNumber == null || isNaN(foundNumber.lookupNumber)) {
						chooseANumber = 1;
					} else {
						chooseANumber = foundNumber.lookupNumber + 1;
					}

					// Make your new record
				  	var jsonRecord = {
				  		originalURL: theParamUrl,
				  		lookupNumber: chooseANumber
				  	};

				  	var newURL = new Url(jsonRecord); //[3]

				  	// Save the record
				  	newURL.save(function(err, savedURL) { //[4]
				    	if (err) return console.error(err);
						res.status(200).json(jsonRecord);
				  	});

				});

			  	
			} else {
				// Remind the user what the lookup number is
				var jsonRecord = {
			  		originalURL: foundURL.originalURL,
			  		lookupNumber: foundURL.lookupNumber
			  	};
			  	res.status(200).json(jsonRecord);
				
			}
		});

	}

});

/* GET page to redirect to a saved URL */
router.get('/go/:lookupNumber', function(req, res, next) {
  	var theParamNumber = req.params.lookupNumber;

  	if (theParamNumber == "") {
  		res.status(200).send("Please enter a number after 'go/'");
  	} else {

	  	// Try to find the lookup number in your database
		Url.findOne({ lookupNumber: theParamNumber }, function(err, foundNumber) {
		    if (err) return err;

		    // If you find it, redirect to that stored address
		    if (foundNumber != null) {
				res.redirect(foundNumber.originalURL);

			// Otherwise, show an error message
			} else {
				var jsonRecord = {
			  		result: "lookup number does not exist in database"
			  	};
			  	res.status(200).json(jsonRecord);
			}
		});

	}

});

module.exports = router;
