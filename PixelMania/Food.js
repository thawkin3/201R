/**************************************************
** FOOD CLASS
**************************************************/
var Food = function(x, y, number) {
	var x = x;
	var y = y;
	var size = 5;
	var color = '#000';
	var number = number;
	
	// Getters and setters
	// gets food X position
	var getX = function() {
		return x;
	};

	// gets food Y position
	var getY = function() {
		return y;
	};

	// gets food size
	var getSize = function() {
		return size;
	}

	// gets food color
	var getColor = function() {
		return color;
	}

	// sets food X position
	var setX = function(newX) {
		x = newX;
	};

	// sets food Y position
	var setY = function(newY) {
		y = newY;
	};

	// Draw food
	var draw = function(ctx) {
		ctx.fillStyle = color;
		ctx.fillRect(x - size/2, y - size/2, size, size);
	};

	// Define which variables and methods can be accessed
	return {
		getX: getX,
		getY: getY,
		getSize: getSize,
		getColor: getColor,
		setX: setX,
		setY: setY,
		draw: draw,
		number: number
	}
};

// Export the Food class so you can use it in
// other files by using require('Food').Food
exports.Food = Food;