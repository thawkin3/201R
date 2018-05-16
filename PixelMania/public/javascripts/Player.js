/**************************************************
** GAME PLAYER CLASS
**************************************************/
var Player = function(startX, startY, startSize, startColor, id, username) {
	var x = startX;
	var y = startY;
	var size = startSize;
	var color = startColor;
	var id = id;
	var username = username;
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

	// gets your size
	var getSize = function() {
		return size;
	}

	// gets your color
	var getColor = function() {
		return color;
	}

	// gets your id
	var getId = function() {
		return id;
	}

	// gets your username
	var getUsername = function() {
		return username;
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
		if (keys.up && y > 0 + size/2) {
			y -= moveAmount;
		} else if (keys.down && y < canvas.height - size/2) {
			y += moveAmount;
		};

		// Left key takes priority over right
		if (keys.left && x > 0 + size/2) {
			x -= moveAmount;
		} else if (keys.right && x < canvas.width - size/2) {
			x += moveAmount;
		};

		return (prevX != x || prevY != y) ? true : false;
	};

	// Draw player
	var draw = function(ctx) {
		ctx.beginPath();  							// Starts a new shape.
	    ctx.fillStyle = color;  					// Sets the fill color.
	    ctx.arc(x, y, size/2, 0, Math.PI*2);  		// Draws a full 2 pi arc (circle).
	    ctx.lineWidth = 1;  						// Small line width.
	    ctx.fill();  								// Fills the circle with the specified fill color.
	    ctx.stroke();  								// Actually draws the circle on the canvas now.
	};

	// Define which variables and methods can be accessed
	return {
		getX: getX,
		getY: getY,
		getSize: getSize,
		getColor: getColor,
		getId: getId,
		getUsername: getUsername,
		setX: setX,
		setY: setY,
		setSize: setSize,
		update: update,
		draw: draw,
	};
};
