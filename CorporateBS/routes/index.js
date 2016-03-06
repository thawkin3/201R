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
        console.log(adverbs);
        while (jsonResult.adverbs.length < 3) {
        	var index = Math.floor(Math.random() * adverbs.length);
        	if (jsonResult.adverbs.indexOf(adverbs[index] == -1)) {
        		jsonResult.adverbs.push(adverbs[index]);
        	}
        }

        console.log(jsonResult);

        res.status(200).json(jsonResult);

    });
});

module.exports = router;
