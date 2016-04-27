/**************************************************
** RED BALL CLASS
**************************************************/
var Ball = function(startX, startY) {
	var x = startX;
	var y = startY;
	var dx = 2;
	var dy = 2;
	var radius = 10;
	var color = "red";
	var id;

	// Getters and setters
	// gets ball X position
	var getX = function() {
		return x;
	};

	// gets ball Y position
	var getY = function() {
		return y;
	};

	// gets ball X speed
	var getDX = function() {
		return dx;
	};

	// gets ball Y speed
	var getDY = function() {
		return dy;
	};

	// gets ball color
	var getColor = function() {
		return color;
	}

	// sets ball X position
	var setX = function(newX) {
		x = newX;
	};

	// sets ball Y position
	var setY = function(newY) {
		y = newY;
	};

	// sets ball X speed
	var setDX = function(newDX) {
		dx = newDX;
	};

	// sets ball Y speed
	var setDY = function(newDY) {
		dy = newDY;
	};

	// Define which variables and methods can be accessed
	return {
		getX: getX,
		getY: getY,
		getDX: getDX,
		getDY: getDY,
		getColor: getColor,
		setX: setX,
		setY: setY,
		setDX: setDX,
		setDY: setDY,
		id: id
	}
};

// Export the Ball class so you can use it in
// other files by using require("Ball").Ball
exports.Ball = Ball;