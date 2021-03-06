/**************************************************
** RED BALL CLASS
**************************************************/
var Ball = function(startX, startY, startDx, startDy, id) {
    var x = startX;
    var y = startY;
    var dx = startDx;
    var dy = startDy;
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
    };

    // gets ball id
    var getId = function() {
        return id;
    };

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
        if ((x + radius > 1000) || (x - radius < 0)) {
            dx = -dx;
        }

        // If the ball has hit the bottom, bounce it.
        if ((y + radius > 500) || (y - radius < 0)) { 
            dy = -dy; 
        }

        return true;
    };

    // Define which variables and methods can be accessed
    return {
        getX: getX,
        getY: getY,
        getDX: getDX,
        getDY: getDY,
        getColor: getColor,
        getId: getId,
        setX: setX,
        setY: setY,
        setDX: setDX,
        setDY: setDY,
        update: update,
    };
};

// Export the Ball class so you can use it in
// other files by using require('Ball').Ball
exports.Ball = Ball;
