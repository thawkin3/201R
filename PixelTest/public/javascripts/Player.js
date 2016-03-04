/**************************************************
** GAME PLAYER CLASS
**************************************************/
var Player = function(startX, startY, startSize) {
	var x = startX;
	var y = startY;
	var id;
	var moveAmount = 2;
	var size = startSize;
	
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

	// Update player position
	var update = function(keys) {
		// Previous position
		var prevX = x;
		var prevY = y;

		// Up key takes priority over down
		if (keys.up && y > 5) {
			y -= moveAmount;
			size += 1;		// Updates the size that is shown on your own screen
		} else if (keys.down && y < 495 - size) {
			y += moveAmount;
			size += 1;		// Updates the size that is shown on your own screen
		};

		// Left key takes priority over right
		if (keys.left && x > 5) {
			x -= moveAmount;
			size += 1;		// Updates the size that is shown on your own screen
		} else if (keys.right && x < 695 - size) {
			x += moveAmount;
			size += 1;		// Updates the size that is shown on your own screen
		};

		return (prevX != x || prevY != y) ? true : false;
	};

	// Draw player
	var draw = function(ctx) {
		ctx.fillRect(x - 5, y - 5, size, size);
	};

	// Define which variables and methods can be accessed
	return {
		getX: getX,
		getY: getY,
		getSize: getSize,
		setX: setX,
		setY: setY,
		setSize: setSize,
		update: update,
		draw: draw
	}
};
