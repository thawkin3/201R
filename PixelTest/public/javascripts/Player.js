/**************************************************
** GAME PLAYER CLASS
**************************************************/
var Player = function(startX, startY) {
	var x = startX;
	var y = startY;
	var id;
	var moveAmount = 2;
	
	// Getters and setters
	// gets your X position
	var getX = function() {
		return x;
	};

	// gets your Y position
	var getY = function() {
		return y;
	};

	// sets your X position
	var setX = function(newX) {
		x = newX;
	};

	// sets your Y position
	var setY = function(newY) {
		y = newY;
	};

	// Update player position
	var update = function(keys) {
		// Previous position
		var prevX = x;
		var prevY = y;

		// Up key takes priority over down
		if (keys.up && y > 5) {
			y -= moveAmount;
		} else if (keys.down && y < 495) {
			y += moveAmount;
		};

		// Left key takes priority over right
		if (keys.left && x > 5) {
			x -= moveAmount;
		} else if (keys.right && x < 695) {
			x += moveAmount;
		};

		return (prevX != x || prevY != y) ? true : false;
	};

	// Draw player
	var draw = function(ctx) {
		ctx.fillRect(x-5, y-5, 10, 10);
	};

	// Define which variables and methods can be accessed
	return {
		getX: getX,
		getY: getY,
		setX: setX,
		setY: setY,
		update: update,
		draw: draw
	}
};
