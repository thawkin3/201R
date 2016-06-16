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
  lookupNUmber: Number
});

var Url = mongoose.model('Url', urlSchema); // Makes an object from that schema as a model

var db = mongoose.connection; // Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); // Checks for connection errors
db.once('open', function() { // Lets us know when we're connected
  console.log('Connected');
});

/* GET page to enter a new URL */
router.get('new/:url', function(req, res, next) {
  	var theParamUrl = req.params.url;
  	console.log("inside the route, and here's the url: " + theParamUrl);

  	// Try to find the URL in your database
	Url.findOne({ originalURL: theParamUrl }, function(err, foundURL) {
	    if (err) return err;
		console.log("inside the findOne method, and here's the search results:");
		console.log(foundURL);
		
		// If it wasn't found, then this is a new URL
		if (foundURL == null) {
		  	
			// We'll need to make a new entry and assign it a new number
			var chooseANumber;

			// Look for the highest number in the database, and add 1 to that number
			Url.findOne({}).sort('-lookupNUmber').exec(function(err, foundNumber) {
				if (foundNumber == null) {
					chooseANumber = 1;
				} else {
					chooseANumber = foundNumber.lookupNUmber + 1;
				}

				// Make your new record
			  	var jsonRecord = {
			  		originalURL: theParamUrl,
			  		lookupNUmber: chooseANumber
			  	};
			  	console.log("jsonRecord is: ");
			  	console.log(jsonRecord);

			  	var newURL = new Url(jsonRecord, false); //[3]
			  	console.log("newURL is: ");
			    console.log(newURL);
			  	
			  	// Save the record
			  	newURL.save(function(err, savedURL) { //[4]
			    	console.log("inside the save method");
			    	if (err) return console.error(err);
			  		console.log("savedURL is: ");
			    	console.log(savedURL);
					res.status(200).json(jsonRecord);
			  	});

			});

		  	
		} else {
			// Remind the user what the lookup number is
			console.log("found the URL");
			var jsonRecord = {
		  		originalURL: foundURL.originalURL,
		  		lookupNUmber: foundURL.lookupNUmber
		  	};
		  	console.log("jsonRecord is: ");
		  	console.log(jsonRecord);
		  	res.status(200).json(jsonRecord);
			
		}
	});
});

/* GET page to redirect to a saved URL */
router.get('lookup/:lookupNumber', function(req, res, next) {
  	var theParamNumber = req.params.lookupNumber;

  	// Try to find the lookup number in your database
	Url.findOne({ lookupNumber: theParamNumber }, function(err, foundNumber) {
	    if (err) return err;

	    if (foundNumber != null) {
			console.log("inside the findOne method, and here's the search results:");
			console.log(foundNumber);
			res.redirect(foundNumber.newURL);
		} else {
			var jsonRecord = {
		  		result: "lookup number does not exist in database"
		  	};
		  	console.log("jsonRecord is: ");
		  	console.log(jsonRecord);
		  	res.status(200).json(jsonRecord);
		}
	});

});

module.exports = router;
