var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root:  'public' });
});


/* TimeStamp MicroService */

router.get('/gettime',function(req, res, next) {

	theQuery = req.query.q;

	var jsonResult = {
    	unix: null,
    	normal: null
    };

	if (parseInt(theQuery) == theQuery) {
		var date = new Date(theQuery * 1000);
		jsonResult.normal = date.toDateString();
		jsonResult.unix = theQuery;
	} else {
		jsonResult.normal = theQuery;
		jsonResult.unix = Date.parse(theQuery);
	}

    console.log(jsonResult);

    res.status(200).json(jsonResult);

});


module.exports = router;
