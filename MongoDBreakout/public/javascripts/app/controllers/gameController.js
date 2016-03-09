(function() {

	var gameController = function ($scope, $routeParams, $rootScope, $location, $timeout) {

		var gameEnd = false;

		// variables for the ball
		var ballSize = 10;
		var x = 200;
		var y = 200;
		var dx = 2;
		var dy = 2;

		// set up the canvas
		var canvas = document.getElementById("gameCanvas");
		var ctx = canvas.getContext("2d");

		console.log(canvas);
		console.log(ctx);

		// Locator function in a loop
		$scope.mainLoop = function () {
			
			// draw our canvas here
			$scope.update();
			$scope.draw();
			// have logic for the game to end or not
			
			if (!gameEnd) {
				// Recursively call our loop
				window.requestAnimationFrame($scope.mainLoop);
			} else {
				// end the game and go to a new view	
			}
		};

		// Update ball position
		$scope.update = function() {
			// Move the ball to its new position.
		    x += dx;
		    y += dy;

		    // If the ball has hit the side, bounce it.
		    if ((x + (ballSize/2) > canvas.width) || (x - (ballSize/2) < 0)) {
		    	dx = -dx;
		    }

		    // If the ball has hit the bottom, bounce it.
		    if ((y + (ballSize/2) > canvas.height) || (y - (ballSize/2) < 0)) { 
		    	dy = -dy; 
		    }

			return true;
		};

		// Draw ball
		$scope.draw = function() {
			ctx.fillStyle = "#f1f1f1";
			ctx.fillRect(x - ballSize/2, y - ballSize/2, ballSize, ballSize);
		};

		// Start the game
		$scope.initialize = function() {
			
			$scope.mainLoop();
		}

		$scope.initialize();

	};

	gameController.$inject = ['$scope', '$routeParams', '$rootScope', '$location', '$timeout'];

	angular.module('MongoDBreakout')
	    .controller('gameController', gameController);

}());