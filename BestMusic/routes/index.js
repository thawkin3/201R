var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Song = mongoose.model('Song');

/* GET songs */
router.get('/songs', function(req, res, next) {
  Song.find(function(err, songs){
    if(err){ return next(err); }
    res.json(songs);
  });
});

/* POST a song */
router.post('/songs', function(req, res, next) {
  var song = new Song(req.body);
  song.save(function(err, song){
    if(err){ return next(err); }
    res.json(song);
  });
});

/* Helper Param */
router.param('song', function(req, res, next, id) {
  var query = Song.findById(id);
  query.exec(function (err, song){
    if (err) { return next(err); }
    if (!song) { return next(new Error("can't find song")); }
    req.song = song;
    return next();
  });
});

/* GET a single song */
router.get('/songs/:song', function(req, res) {
  res.json(req.song);
});

/* PUT an upvote on a song */
router.put('/songs/:song/upvote', function(req, res, next) {
  req.song.upvote(function(err, song){
    if (err) { return next(err); }
    res.json(song);
  });
});

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
