var mongoose = require('mongoose');
var SongSchema = new mongoose.Schema({
	title: String,
	artist: String,
	album: String,
	genre: String,
	art: String,
	upvotes: {type: Number, default: 0}
});

SongSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

mongoose.model('Song', SongSchema);