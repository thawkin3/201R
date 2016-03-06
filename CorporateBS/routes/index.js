var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root:  'public' });
});

/* REST service to generate some BS */
router.get('/getwords',function(req, res, next) {
	console.log("In getwords route");

	var jsonResult = {
		"adverbs": [],
		"verbs": [],
		"adjectives": [],
		"nouns": []
	};
	
	fs.readFile(__dirname + '/texts/adverbs.txt', function(err, data) {
        
        if (err) throw err;

        var adverbs = data.toString().split("\n");
        while (jsonResult.adverbs.length < 3) {
        	var index = Math.floor(Math.random() * adverbs.length);
        	if (jsonResult.adverbs.indexOf(adverbs[index] == -1)) {
        		jsonResult.adverbs.push(adverbs[index]);
        	}
        }

        if (jsonResult.adverbs.length == 3 && jsonResult.verbs.length == 3 && jsonResult.adjectives.length == 3 && jsonResult.nouns.length == 3) {
        	console.log(jsonResult);
        	res.status(200).json(jsonResult);
        }

    });

    fs.readFile(__dirname + '/texts/verbs.txt', function(err, data) {
        
        if (err) throw err;

        var verbs = data.toString().split("\n");
        while (jsonResult.verbs.length < 3) {
        	var index = Math.floor(Math.random() * verbs.length);
        	if (jsonResult.verbs.indexOf(verbs[index] == -1)) {
        		jsonResult.verbs.push(verbs[index]);
        	}
        }

        if (jsonResult.adverbs.length == 3 && jsonResult.verbs.length == 3 && jsonResult.adjectives.length == 3 && jsonResult.nouns.length == 3) {
        	console.log(jsonResult);
        	res.status(200).json(jsonResult);
        }

    });

    fs.readFile(__dirname + '/texts/adjectives.txt', function(err, data) {
        
        if (err) throw err;

        var adjectives = data.toString().split("\n");
        while (jsonResult.adjectives.length < 3) {
        	var index = Math.floor(Math.random() * adjectives.length);
        	if (jsonResult.adjectives.indexOf(adjectives[index] == -1)) {
        		jsonResult.adjectives.push(adjectives[index]);
        	}
        }

        if (jsonResult.adverbs.length == 3 && jsonResult.verbs.length == 3 && jsonResult.adjectives.length == 3 && jsonResult.nouns.length == 3) {
        	console.log(jsonResult);
        	res.status(200).json(jsonResult);
        }

    });

    fs.readFile(__dirname + '/texts/nouns.txt', function(err, data) {
        
        if (err) throw err;

        var nouns = data.toString().split("\n");
        while (jsonResult.nouns.length < 3) {
        	var index = Math.floor(Math.random() * nouns.length);
        	if (jsonResult.nouns.indexOf(nouns[index] == -1)) {
        		jsonResult.nouns.push(nouns[index]);
        	}
        }

        if (jsonResult.adverbs.length == 3 && jsonResult.verbs.length == 3 && jsonResult.adjectives.length == 3 && jsonResult.nouns.length == 3) {
        	console.log(jsonResult);
        	res.status(200).json(jsonResult);
        }

    });
});

module.exports = router;
