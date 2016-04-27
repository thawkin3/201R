/**************************************************
** RED BALL CLASS
**************************************************/
var Ball = function(startX, startY) {
	var x = startX;
	var y = startY;
	var dx = Math.floor(Math.random() * 4) + 1;
	var dy = Math.floor(Math.random() * 4) + 1;
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

	// Update ball position
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

		return true;
	};

	// Draw ball
	var draw = function(ctx) {
		ctx.beginPath();  // Starts a new shape.
	    ctx.fillStyle = this.getColor();  // Sets the fill color.
	    ctx.arc(x, y, radius, 0, Math.PI*2);  // Draws a full 2 pi arc (circle).
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
		setDX: setDX,
		setDY: setDY,
		update: update,
		draw: draw
	}
};
