var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Dish = mongoose.model('Dish');

/* GET comments */
router.get('/dishes', function(req, res, next) {
  Dish.find(function(err, dishes){
    if(err){ return next(err); }
    res.json(dishes);
  });
});

/* POST a comment */
router.post('/dishes', function(req, res, next) {
  var dish = new Dish(req.body);
  dish.save(function(err, dish){
    if(err){ return next(err); }
    res.json(dish);
  });
});

/* Helper Param */
router.param('dish', function(req, res, next, id) {
  var query = Dish.findById(id);
  query.exec(function (err, dish){
    if (err) { return next(err); }
    if (!dish) { return next(new Error("can't find dish")); }
    req.dish = dish;
    return next();
  });
});

/* GET a single comment */
router.get('/dishes/:dish', function(req, res) {
  res.json(req.dish);
});

/* PUT an upvote on a comment */
router.put('/dishes/:dish/upvote', function(req, res, next) {
  req.dish.upvote(function(err, dish){
    if (err) { return next(err); }
    res.json(dish);
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
