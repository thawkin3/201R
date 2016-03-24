var mongoose = require('mongoose');
var DishSchema = new mongoose.Schema({
	name: String,
	type: String,
	upvotes: {type: Number, default: 0}
});

DishSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

mongoose.model('Dish', DishSchema);