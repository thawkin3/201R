var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.sendFile('index.html', { root:  'public' });
});

router.get('/getcity',function(req, res, next) {
	fs.readFile(__dirname + '/cities.txt', function(err, data) {
        
        if (err) throw err;
        
        var myRe = new RegExp("^" + req.query.q);
        var jsonResult = [];
        var cities = data.toString().split("\n");
        
        for (var i = 0; i < cities.length; i++) {
        	var result = cities[i].search(myRe);
          	if (result != -1) {
            	jsonResult.push({city:cities[i]});
          	}
        }

        res.status(200).json(jsonResult);

    });
});

module.exports = router;