/**************************************************
** GAME KEYBOARD CLASS
**************************************************/
var Keys = function(up, left, right, down) {
    var up = up || false;
    var left = left || false;
    var right = right || false;
    var down = down || false;
        
    var onKeyDown = function(e) {
        var that = this,
            theKey = e.keyCode;
        switch (theKey) {
            // Controls
            case 37: // Left
                that.left = true; // Left key will take priority over the right key
                break;
            case 38: // Up
                that.up = true; // Up key will take priority over the down key
                break;
            case 39: // Right
                that.right = true;
                break;
            case 40: // Down
                that.down = true;
                break;
        };
    };
    
    var onKeyUp = function(e) {
        var that = this,
            theKey = e.keyCode;
        switch (theKey) {
            case 37: // Left
                that.left = false;
                break;
            case 38: // Up
                that.up = false;
                break;
            case 39: // Right
                that.right = false;
                break;
            case 40: // Down
                that.down = false;
                break;
        };
    };

    return {
        up: up,
        left: left,
        right: right,
        down: down,
        onKeyDown: onKeyDown,
        onKeyUp: onKeyUp
    };
};
