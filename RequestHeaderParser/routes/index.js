var express = require('express');
var router = express.Router();
var http = require('http');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
    console.log("on the home page");
    var test = {
    	theKey: "theValue"
    }

    test.theKey = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;

  	res.status(200).json(test);
});

module.exports = router;
