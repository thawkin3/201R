var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.sendFile('weather.html', { root:  'public' });
});

router.get('/getcity',function(req, res, next) {
	console.log("In getcity route");
	
	fs.readFile(__dirname + '/cities.txt', function(err, data) {
        
        if (err) throw err;
        
        var myRe = new RegExp("^" + req.query.q);
        console.log(myRe);
        var jsonResult = [];
        var cities = data.toString().split("\n");
        
        for (var i = 0; i < cities.length; i++) {
        	var result = cities[i].search(myRe);
          	if (result != -1) {
            	console.log(cities[i]);
            	jsonResult.push({city:cities[i]});
          	}
        }

        console.log(jsonResult);

        res.status(200).json(jsonResult);

    });
});

module.exports = router;
