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
	// gets your X position
	var getX = function() {
		return x;
	};

	// gets your Y position
	var getY = function() {
		return y;
	};

	// gets your X speed
	var getDX = function() {
		return dx;
	};

	// gets your Y speed
	var getDY = function() {
		return dy;
	};

	// gets your color
	var getColor = function() {
		return color;
	}

	// sets your X position
	var setX = function(newX) {
		x = newX;
	};

	// sets your Y position
	var setY = function(newY) {
		y = newY;
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
		id: id
	}
};

// Export the Player class so you can use it in
// other files by using require("Player").Player
exports.Ball = Ball;