(function() {

	var gameController = function ($scope, $routeParams, $rootScope, $location, $timeout) {

		var gameEnd = false;

		// variables for the ball
		var ball_size = 10;
		var ball_x = 220;
		var ball_y = 220;
		var ball_dx = 3;
		var ball_dy = 3;

		// variables for the paddle
		var paddle_width = 100;
		var paddle_height = 10;
		var paddle_x = 330;
		var paddle_y = 450;
		var paddle_dx = 4;
		var left = false;
		var right = false;
		var hitReset = true;
		var theCount = 0;

		// variables for the bricks
		var brickArray = [];
		var brick_height = 20;
		var brick_width = 40;
		var brick_top = 10;
		var brick_left = 10;
		for (var i = 0; i < 32; i++) {
			if (i != 0) {
				brick_left += (brick_width + 10);
			}
			if (i == 8 || i == 16 || i == 24) {
				brick_top += 30;
				brick_left = 10;
			}
			brickArray.push({ h: brick_height, w: brick_width, t: brick_top, l: brick_left });
		}

		// set up the canvas
		var canvas = document.getElementById("gameCanvas");
		var ctx = canvas.getContext("2d");

		// Locator function in a loop
		$scope.mainLoop = function() {
			
			// draw our canvas here
			
			$scope.draw();
			$scope.update();
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
			if (left && paddle_x > 0 + paddle_width/2) {
				paddle_x -= paddle_dx;
			} else if (right && paddle_x < canvas.width - paddle_width/2) {
				paddle_x += paddle_dx;
			};

			// If the ball has hit the paddle, bounce it.
		    if (ctx.getImageData(ball_x, ball_y + 1 + ball_size/2, 1, 1).data[0] == 241) {
		    	console.log(ctx.getImageData(ball_x, ball_y + (ball_size/2), 1, 1).data[0]);
		    	// if (hitReset) {
		    		ball_dy = -ball_dy;
		    	// }
		    	// hitReset = false;
		    	// theCount++;
		    	// ball_y -= 10;
		    	// setTimeout(function(){
		    	// 	hitReset = true;
		    	// }, 1000);
		    }

		    // If the ball has hit a brick from below, bounce it.
		    if (ctx.getImageData(ball_x, ball_y - 3 - ball_size/2, 1, 1).data[0] == 241) {
		    	// hitReset = false;
		    	ball_dy = -ball_dy;
		    	brickArray = brickArray.filter(filterBricks);
		    	// setTimeout(function(){
		    	// 	hitReset = true;
		    	// }, 500);
		    }

			// Move the ball to its new position.
		    ball_x += ball_dx;
		    ball_y += ball_dy;

		    // If the ball has hit the left or right side, bounce it.
		    if ((ball_x + (ball_size/2) >= canvas.width) || (ball_x - (ball_size/2) <= 0)) {
		    	ball_dx = -ball_dx;
		    }

		    // If the ball has hit the top, bounce it.
		    if (ball_y - (ball_size/2) <= 0) { 
		    	ball_dy = -ball_dy; 
		    }

		    // If the ball has hit the canvas's bottom wall, game over.
		    if (ball_y + (ball_size/2) >= canvas.height) {
		    	console.log("game over");
		    	gameEnd = true;
		    }

			return true;
		};

		// Draw ball
		$scope.draw = function() {
			ctx.fillStyle="#050505";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = "#f1f1f1";
			ctx.fillRect(paddle_x - paddle_width/2, paddle_y - paddle_height/2, paddle_width, paddle_height);
			ctx.fillStyle = "#f1f1f1";
			ctx.fillRect(ball_x - ball_size/2, ball_y - ball_size/2, ball_size, ball_size);

			for (var i = 0; i < brickArray.length; i++) {
				ctx.fillStyle = "#f1f1f1";
				ctx.fillRect(brickArray[i].l, brickArray[i].t, brickArray[i].w, brickArray[i].h);
			}
		};

		document.onkeydown = function(e) {
			var theKey = e.keyCode;
			switch (theKey) {
				// Controls
				case 37: // Left
					left = true;
					break;
				case 39: // Right
					right = true; // Will take priority over the left key
					break;
			};
		};

		document.onkeyup = function(e) {
			var theKey = e.keyCode;
			switch (theKey) {
				// Controls
				case 37: // Left
					left = false;
					break;
				case 39: // Right
					right = false; // Will take priority over the left key
					break;
			};
		};

		var filterBricks = function(brick) {
			return ((ball_y - brick.t > 35) || (ball_x - brick.l < 0 || ball_x - brick.l > 40));
		}

		// Start the game
		 $scope.mainLoop();

	};

	gameController.$inject = ['$scope', '$routeParams', '$rootScope', '$location', '$timeout'];

	angular.module('MongoDBreakout')
	    .controller('gameController', gameController);

}());