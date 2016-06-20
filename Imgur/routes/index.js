var express = require('express');
var router = express.Router();
var request = require("request");

var auth = "Client-ID f57ed78a7dcf14c";

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
		request({
			uri: "https://api.imgur.com/3/gallery/search/viral/1?q=" + theKeywords,
			method: "GET",
			headers: {
        		Authorization: auth
      		},
			timeout: 10000,
			followRedirect: true,
			maxRedirects: 10
		}, function(err, response, body) {
	    	if (err) return console.error(err);
			console.log(response);
			console.log(body);
		});

	}

});

/* GET page to show search history */
router.get('/history/', function(req, res, next) {

  	// Look for the last 10 searches in the history
  	Imagesearch.find({}).sort('-date').limit(10).exec(function(err, data) {
	    if (err) return console.error(err);
  		var jsonResult = {};
  		for (var i = 0; i < data.length; i++) {
  			jsonResult[i] = {};
  			jsonResult[i].keywords = data[i].keywords;
  			jsonResult[i].date = data[i].date;
  		}
  		res.status(200).json(jsonResult);
  	});

});

module.exports = router;
