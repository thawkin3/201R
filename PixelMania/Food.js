/**************************************************
** FOOD CLASS
**************************************************/
var Food = function(x, y, id) {
    var x = x;
    var y = y;
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

    // gets food id
    var getId = function() {
        return id;
    };

    // Define which variables and methods can be accessed
    return {
        getX: getX,
        getY: getY,
        getId: getId,
    };
};

// Export the Food class so you can use it in
// other files by using require('Food').Food
exports.Food = Food;
