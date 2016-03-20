(function() {

	var gameController = function ($scope, $routeParams, $rootScope, $location, $timeout) {

		// variables for game play
		var gameEnd = false;
		var gameWin = false;

		// variables for the ball
		var ball_size = 10;
		var ball_x = 220;
		var ball_y = 220;
		// var ball_x = 340;
		// var ball_y = 440;
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
		$scope.brickArray = [];
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
			$scope.brickArray.push({ h: brick_height, w: brick_width, t: brick_top, l: brick_left });
		}

		var filterBricksHitFromBelow = function(brick) {
			return ((ball_y - brick.t > 35 || ball_y - brick.t < 10) || (ball_x - brick.l < 0 || ball_x - brick.l > 40));
		}

		var filterBricksHitFromAbove = function(brick) {
			return ((brick.t - ball_y > 10 || brick.t - ball_y < -15) || (ball_x - brick.l < 0 || ball_x - brick.l > 40));
		}

		
		// Submit your score
		var submitScore = function(){
			var scoreObj = { "Username": $rootScope.user, "Score": $scope.score };
	        console.log(scoreObj);
	        var JSONscoreObj = JSON.stringify(scoreObj);
	        console.log(JSONscoreObj);
			var scoreUrl = "addscore";
			$.ajax({
	  			url: scoreUrl,
	  			type: "POST",
	  			data: JSONscoreObj,
	  			contentType: "application/json; charset=utf-8",
	  			success: function(data,textStatus) {
	      			$timeout(function(){	
	      				console.log("done");
	      				//alert("score submitted!");
	      			}, 100);
	  			}
			})
			.fail(function(){});
			// go to the highscores view
			$timeout(function() {
				$location.url("/highscores");
			}, 2000);
		};
		

		// keep score
		$scope.scoreHelper = 0;
		$scope.score = 0;

		// set up the canvas
		var canvas = document.getElementById("gameCanvas");
		var ctx = canvas.getContext("2d");

		// Locator function in a loop
		$scope.mainLoop = function() {
			
			console.log(ball_y);
			if (ball_y > 1000) {
				alert("greater than 1000");
				console.log("game over");
			    gameEnd = true;
			}

			// TESTING
			// var pixels = ctx.getImageData(ball_x - 5, 490, 10, 1).data;
			// for (var i = 0; i < pixels.length; i += 4) {
			// 	console.log(pixels[i]);
			// 	if (pixels[i] == 241) {
			// 		console.log(ball_y + (ball_size/2));
			//     	console.log("dy: " + ball_dy);
			//     	console.log("x: " + ball_x);
			//     	console.log("game over");
			//     	gameEnd = true;
			// 	}
			// }	
			// END TEST

			// draw our canvas here
			$scope.draw();
			$scope.update();
			// have logic for the game to end or not
			
			if (!gameEnd) {
				// Recursively call our loop
				window.requestAnimationFrame($scope.mainLoop);
			} else {
				// end the game
				// set the text that displays on the canvas
				if (gameWin) {
					ctx.font="20px zig";
					ctx.fillText("YOU WIN",145,200);
					if (gameEnd) {
						// set our new score into the database
						//submitScore();
					}
				} else {
					ctx.font="20px zig";
					ctx.fillText("GAME OVER",130,280);
					if (gameEnd) {
						// set our new score into the database
						//submitScore();
					}
				}
				
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
		    if (ctx.getImageData(ball_x, ball_y + 1 + ball_size/2, 1, 1).data[0] == 242) {
		    	console.log(ctx.getImageData(ball_x, ball_y + (ball_size/2), 1, 1).data[0]);
		    	// ball_dy = -ball_dy;
		    	if (left) {
		    		if (ball_dx < 0) {
		    			ball_dx -= 1;
		    		} else {
		    			ball_dx = -ball_dx;
		    		}
		    	}
		    	if (right) {
		    		if (ball_dx > 0) {
		    			ball_dx += 1;
		    		} else {
		    			ball_dx = -ball_dx;
		    		}
		    	}
		    }

		    // If the ball has hit a brick from below, bounce it.
		    if (ctx.getImageData(ball_x, ball_y - 3 - ball_size/2, 1, 1).data[0] == 241) {
		    	ball_dy = -ball_dy;
		    	$scope.$apply(function() {
		    		$scope.brickArray = $scope.brickArray.filter(filterBricksHitFromBelow);
					$scope.score = 32 + $scope.scoreHelper - $scope.brickArray.length;		    		
					if ($scope.score == 32) {
			    		$timeout(function(){	
			    			$scope.scoreHelper = 48;
			    			$scope.brickArray = [];
							var brick_height = 20;
							var brick_width = 40;
							var brick_top = 10;
							var brick_left = 10;
							
							for (var i = 0; i < 48; i++) {
								if (i != 0) {
									brick_left += (brick_width + 10);
								}
								if (i == 8 || i == 16 || i == 24 || i == 32 || i == 40) {
									brick_top += 30;
									brick_left = 10;
								}
								$scope.brickArray.push({ h: brick_height, w: brick_width, t: brick_top, l: brick_left });
							}
						}, 3000);
		    		}
		    		if ($scope.score == 80) {
		    			$timeout(function(){
			    			$scope.scoreHelper = 112;
			    			$scope.brickArray = [];
							var brick_height = 20;
							var brick_width = 40;
							var brick_top = 10;
							var brick_left = 10;
							
							for (var i = 0; i < 64; i++) {
								if (i != 0) {
									brick_left += (brick_width + 10);
								}
								if (i == 8 || i == 16 || i == 24 || i == 32 || i == 40 || i == 48 || i == 56) {
									brick_top += 30;
									brick_left = 10;
								}
								$scope.brickArray.push({ h: brick_height, w: brick_width, t: brick_top, l: brick_left });
							}
						}, 3000);
		    		}
		    		if ($scope.score == 144) {
		    			gameEnd = true;
		    			gameWin = true;
		    		}
		    	});
		    }

		    // If the ball has hit a brick from above, bounce it.
		    if (ctx.getImageData(ball_x, ball_y + 1 + ball_size/2, 1, 1).data[0] == 241) {
		    	ball_dy = -ball_dy;
		    	$scope.$apply(function() {
		    		$scope.brickArray = $scope.brickArray.filter(filterBricksHitFromAbove);
		    		$scope.score = 32 + $scope.scoreHelper - $scope.brickArray.length;
		    		if ($scope.score == 32) {
			    		$timeout(function(){	
			    			$scope.scoreHelper = 48;
			    			$scope.brickArray = [];
							var brick_height = 20;
							var brick_width = 40;
							var brick_top = 10;
							var brick_left = 10;
							
							for (var i = 0; i < 48; i++) {
								if (i != 0) {
									brick_left += (brick_width + 10);
								}
								if (i == 8 || i == 16 || i == 24 || i == 32 || i == 40) {
									brick_top += 30;
									brick_left = 10;
								}
								$scope.brickArray.push({ h: brick_height, w: brick_width, t: brick_top, l: brick_left });
							}
						}, 3000);
		    		}
		    		if ($scope.score == 80) {
		    			$timeout(function(){
			    			$scope.scoreHelper = 112;
			    			$scope.brickArray = [];
							var brick_height = 20;
							var brick_width = 40;
							var brick_top = 10;
							var brick_left = 10;
							
							for (var i = 0; i < 64; i++) {
								if (i != 0) {
									brick_left += (brick_width + 10);
								}
								if (i == 8 || i == 16 || i == 24 || i == 32 || i == 40 || i == 48 || i == 56) {
									brick_top += 30;
									brick_left = 10;
								}
								$scope.brickArray.push({ h: brick_height, w: brick_width, t: brick_top, l: brick_left });
							}
						}, 3000);
		    		}
		    		if ($scope.score == 144) {
		    			gameEnd = true;
		    			gameWin = true;
		    		}
		    	});
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

		    // If the ball has hit the bottom, bounce it.
		    // if (ball_y + (ball_size/2) >= canvas.height) { 
		    // 	ball_dy = -ball_dy; 
		    // 	console.log("hit bottom!");
		    // }

		    // If the ball has hit the canvas's bottom wall, game over.
		    // if (ctx.getImageData(ball_x, ball_y + 5 + ball_size/2, 1, 1).data[0] == 119 && ball_dy > 0) {
		    // if (ball_y + (ball_size/2) >= canvas.height) {
				// var pixels = ctx.getImageData(0, 490, canvas.width, 1).data;
				// var pixels = ctx.getImageData(ball_x - 5, 490, 10, 1).data;
				// for (var i = 0; i < pixels.length; i += 4) {
				// 	console.log(pixels[i]);
				// 	if (pixels[i] == 241) {
				// 		console.log(ball_y + (ball_size/2));
				//     	console.log("dy: " + ball_dy);
				//     	console.log("x: " + ball_x);
				//     	console.log("game over");
				//     	gameEnd = true;
				// 	}
				// }		    
		    	
		    //}

			return true;
		};

		// Draw ball
		$scope.draw = function() {
			ctx.fillStyle="#050505";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			// TEST
			ctx.fillStyle="#777";
			ctx.fillRect(0, canvas.height - 5, canvas.width, canvas.height);
			// END TEST
			ctx.fillStyle = "#f2f2f2";
			ctx.fillRect(paddle_x - paddle_width/2, paddle_y - paddle_height/2, paddle_width, paddle_height);
			ctx.fillStyle = "#f1f1f1";
			ctx.fillRect(ball_x - ball_size/2, ball_y - ball_size/2, ball_size, ball_size);

			ctx.fillStyle = "#f1f1f1";
			for (var i = 0; i < $scope.brickArray.length; i++) {
				ctx.fillRect($scope.brickArray[i].l, $scope.brickArray[i].t, $scope.brickArray[i].w, $scope.brickArray[i].h);
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

		

		// Start the game
		 $scope.mainLoop();

	};

	gameController.$inject = ['$scope', '$routeParams', '$rootScope', '$location', '$timeout'];

	angular.module('MongoDBreakout')
	    .controller('gameController', gameController);

}());