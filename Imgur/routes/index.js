var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root:  'public' });
});

/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); // Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/imagesearchDB'); // Connects to a mongo database called "urlDB"

var imagesearchSchema = mongoose.Schema({ // Defines the imagesearch Schema for this database
  keywords: String,
  date: Date
});

var Imagesearch = mongoose.model('Imagesearch', imagesearchSchema); // Makes an object from that schema as a model

var db = mongoose.connection; // Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); // Checks for connection errors
db.once('open', function() { // Lets us know when we're connected
  console.log('Connected');
});

/* GET page to run a new image search */
router.get('/search/:keywords(*)', function(req, res, next) {
  	var theKeywords = req.params.keywords;

  	if (theKeywords == "") {
  		res.status(200).send("Please enter keyword(s) after 'search/'");
  	} else {

		// Make your new record to save in the search history
	  	var jsonRecord = {
	  		keywords: theKeywords,
	  		date: new Date()
	  	};
	  	// console.log("jsonRecord is: ");
	  	// console.log(jsonRecord);

	  	var newSearch = new Imagesearch(jsonRecord); //[3]
	  	// console.log("newSearch is: ");
	    // console.log(newSearch);
	  	
	  	// Save the record
	  	newSearch.save(function(err, data) { //[4]
	    	// console.log("inside the save method");
	    	if (err) return console.error(err);
	  		console.log("saved record is: ");
	    	console.log(data);
			res.status(200).json(jsonRecord);
	  	});

	  	// Query the Imgur API and return the search results


	}

});

/* GET page to show search history */
router.get('/history/', function(req, res, next) {

  	// Look for the last 10 searches in the history
  	Url.find({}).sort('-date').limit(10).exec(function(err, data) {
	    if (err) return console.error(err);
  		res.status(200).json(data);
  	});

});

module.exports = router;
