var express = require('express');
var router = express.Router();
var http = require('http');

/* GET home page. */
router.get('/', function(req, res, next) {
    var jsonResult = {
    	ip: null,
    	language: null,
    	useragent: null
    }

    jsonResult.ip = req.connection.remoteAddress || req.socket.remoteAddress;
    var ipArray = jsonResult.ip.split(":");
    jsonResult.ip = ipArray[ipArray.length - 1];

    jsonResult.language = req.headers["accept-language"];
    jsonResult.language = jsonResult.language.split(",")[0];

    jsonResult.useragent = req.headers['user-agent'];

  	res.status(200).json(jsonResult);
});

module.exports = router;
