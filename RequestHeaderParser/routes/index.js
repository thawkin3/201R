var express = require('express');
var router = express.Router();
var http = require('http');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
    console.log("on the home page");
    console.log(req.connection);
    console.log(req.connection.remoteAddress);
    console.log(req.socket.remoteAddress);
    console.log(req.connection.socket.remoteAddress);
    var jsonResult = {
    	ip: null,
    	lang: null,
    	useragent: null
    }

    jsonResult.ip = req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    jsonResult["lang"] = req.acceptedLanguages;
    jsonResult.useragent = req.headers['user-agent'];

  	res.status(200).json(jsonResult);
});

module.exports = router;
