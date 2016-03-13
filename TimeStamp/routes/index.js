var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("On the home page");
  console.log(req.query.q);
  res.sendFile('index.html', { root:  'public' });
});


/* TimeStamp MicroService */

router.get('/gettime',function(req, res, next) {
	console.log("In gettime route");
	console.log(req.query.q);

    var jsonResult = {
    	unix: null,
    	normal: null
    };

    console.log(jsonResult);

    res.status(200).json(jsonResult);

    });
});


module.exports = router;
