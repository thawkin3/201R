/**************************************************
** RED BALL CLASS
**************************************************/
var Ball = function(startX, startY, id) {
	var x = startX;
	var y = startY;
	var radius = 10;
	var color = 'red';
	var id = id;
	
	// Getters and setters
	// gets ball X position
	var getX = function() {
		return x;
	};

	// gets ball Y position
	var getY = function() {
		return y;
	};

	// gets ball color
	var getColor = function() {
		return color;
	}

	// gets ball id
	var getId = function() {
		return id;
	}

	// sets ball X position
	var setX = function(newX) {
		x = newX;
	};

	// sets ball Y position
	var setY = function(newY) {
		y = newY;
	};

	// Draw ball
	var draw = function(ctx) {
		ctx.beginPath();  							// Starts a new shape.
	    ctx.fillStyle = this.getColor();  			// Sets the fill color.
	    ctx.arc(x, y, radius, 0, Math.PI*2);  		// Draws a full 2 pi arc (circle).
	    ctx.lineWidth = 1;  						// Small line width.
	    ctx.fill();  								// Fills the circle with the specified fill color.
	    ctx.stroke();  								// Actually draws the circle on the canvas now.
	};

	// Define which variables and methods can be accessed
	return {
		getX: getX,
		getY: getY,
		getColor: getColor,
		getId: getId,
		setX: setX,
		setY: setY,
		draw: draw
	}
};
