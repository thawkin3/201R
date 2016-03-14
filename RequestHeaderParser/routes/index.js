var express = require('express');
var router = express.Router();
var http = require('http');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
    console.log("on the home page");
    console.log(req.connection);
    var jsonResult = {
    	ip: null,
    	language: null,
    	useragent: null
    }

    test.ip = req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;

  	res.status(200).json(jsonResult);
});

module.exports = router;
