var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root:  'public' });
});


/* TimeStamp MicroService */

router.get('/gettime',function(req, res, next) {

	var theQuery = req.query.q;

	var jsonResult = {
    	unix: null,
    	normal: null
    };

	if (parseInt(theQuery) == theQuery) {
		var date = new Date(theQuery * 1000);
		jsonResult.unix = theQuery;
		jsonResult.normal = date.toDateString();
	} else {
		jsonResult.unix = Date.parse(theQuery);
		jsonResult.normal = new Date( Date.parse(theQuery) ).toDateString();
		if (jsonResult.normal == "Invalid Date") {
			jsonResult.normal = null;
		}
	}

    res.status(200).json(jsonResult);

});


module.exports = router;
