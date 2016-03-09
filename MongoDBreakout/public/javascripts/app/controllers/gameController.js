(function() {

	var gameController = function ($scope, $routeParams, $rootScope, $location, $timeout) {

		var gameEnd = false;

		// variables for the ball
		var ball_size = 10;
		var ball_x = 200;
		var ball_y = 200;
		var ball_dx = 3;
		var ball_dy = 3;

		// variables for the paddle
		var paddle_width = 100;
		var paddle_height = 10;
		var paddle_x = 100;
		var paddle_y = 450;
		var paddle_dx = 4;

		// set up the canvas
		var canvas = document.getElementById("gameCanvas");
		var ctx = canvas.getContext("2d");

		// Initialize keyboard controls
		var keys = new Keys();

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
			// Move the paddle, left key takes priority over right
			if (keys.left && paddle_x > 0 + paddle_width/2) {
				paddle_x -= paddle_dx;
			} else if (keys.right && paddle_x < 400 - paddle_width/2) {
				paddle_x += paddle_dx;
			};


			// Move the ball to its new position.
		    ball_x += ball_dx;
		    ball_y += ball_dy;

		    // If the ball has hit the side, bounce it.
		    if ((ball_x + (ball_size/2) > canvas.width) || (ball_x - (ball_size/2) < 0)) {
		    	ball_dx = -ball_dx;
		    }

		    // If the ball has hit the bottom, bounce it.
		    if ((ball_y + (ball_size/2) > canvas.height) || (ball_y - (ball_size/2) < 0)) { 
		    	ball_dy = -ball_dy; 
		    }

			return true;
		};

		// Draw ball
		$scope.draw = function() {
			ctx.fillStyle="#050505";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = "#f1f1f1";
			ctx.fillRect(paddle_x - paddle_width/2, paddle_y - paddle_width/2, paddle_width, paddle_height);
			ctx.fillStyle = "#f1f1f1";
			ctx.fillRect(ball_x - ball_size/2, ball_y - ball_size/2, ball_size, ball_size);
		};

		// Start the game
		// $scope.initialize = function() {
			
		 	$scope.mainLoop();
		// }

		// $scope.initialize();

	};

	gameController.$inject = ['$scope', '$routeParams', '$rootScope', '$location', '$timeout'];

	angular.module('MongoDBreakout')
	    .controller('gameController', gameController);

}());