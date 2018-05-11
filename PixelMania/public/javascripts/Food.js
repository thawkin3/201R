/**************************************************
** FOOD CLASS
**************************************************/
var Food = function(x, y, id) {
	var x = x;
	var y = y;
	var size = 5;
	var color = '#000';
	var id = id;
	
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

	// gets food id
	var getId = function() {
		return id;
	}

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
		getId: getId,
		draw: draw,
	};
};
