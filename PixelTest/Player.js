/**************************************************
** GAME PLAYER CLASS
**************************************************/
var Player = function(startX, startY, startSize, startColor) {
	var x = startX;
	var y = startY;
	var size = startSize;
	var color = startColor;
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

	// gets your size
	var getSize = function() {
		return size;
	}

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

	// sets your size
	var setSize = function(newSize) {
		size = newSize;
	}

	// Define which variables and methods can be accessed
	return {
		getX: getX,
		getY: getY,
		getSize: getSize,
		getColor: getColor,
		setX: setX,
		setY: setY,
		setSize: setSize,
		id: id
	}
};

// Export the Player class so you can use it in
// other files by using require("Player").Player
exports.Player = Player;