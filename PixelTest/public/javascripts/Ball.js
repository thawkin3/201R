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

	// Update player position
	var update = function() {
		// Previous position
		var prevX = x;
		var prevY = y;

		// Move the ball to its new position.
	    x += dx;
	    y += dy;

	    // If the ball has hit the side, bounce it.
	    if ((x + radius > canvas.width) || (x - radius < 0)) {
	    	dx = -dx;
	    }

	    // If the ball has hit the bottom, bounce it.
	    if ((y + radius > canvas.height) || (y - radius < 0)) { 
	    	dy = -dy; 
	    }

		return (prevX != x || prevY != y) ? true : false;
	};

	// Draw ball
	var draw = function(ctx) {
		ctx.beginPath();  // Starts a new shape.
	    ctx.fillStyle = ball.fillColor;  // Sets the fill color.
	    ctx.arc(x, y, size, 0, Math.PI*2);  // Draws a full 2 pi arc (circle).
	    ctx.lineWidth = 1;  // Small line width.
	    ctx.fill();  // Fills the circle with the specified fill color.
	    ctx.stroke();  // Actually draws the circle on the canvas now.
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
		update: update,
		draw: draw
	}
};
