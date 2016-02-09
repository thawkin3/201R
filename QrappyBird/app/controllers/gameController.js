(function() {

	var gameController = function ($scope, $routeParams, $rootScope, $location, $timeout) {

		// Array to hold some pipe limits in
		$scope.topBottom;

		// Variable for the game start
		$scope.gameStart = true;

		// Locator function in a loop
		$scope.mainLoop = function () {
			
			var ourArray = document.getElementsByClassName("pipeBottom");

			for(var i = 0; i < ourArray.length; i++) {
				if(parseInt(ourArray[i].style.left) >= 75 & parseInt(ourArray[i].style.left) <= 140) {
					$rootScope.$apply(function(){
						$rootScope.currentScore = i + 1;
					});
					var birdPos = parseInt(document.getElementById("bird").style.top);
					if (birdPos > $scope.topBottom[i][0] | birdPos < $scope.topBottom[i][1]) {
						document.getElementById("theme").pause();
						var gameEnd = true;
						var yourScore = i;
						if ($rootScope.currentScore > $rootScope.highscore) {
							$rootScope.$apply(function(){
								$rootScope.highscore = $rootScope.currentScore;
							});
						}
						$timeout(function() {
							$location.url("/score");
						}, 2000);
					};
					break;
				};
			};
			
			if (!gameEnd) {
				// Recursively call our loop
				window.requestAnimationFrame($scope.mainLoop);
			} else {
				// Stop all our animations
				$('#bird').stop(true,false);
				$('.pipeTop').stop(true,false);
				$('.pipeBottom').stop(true,false);

				// Die
				$('#bird').addClass("dead");
				$('#bird').animate({top:'+=1000px'},3000);
				$(document).unbind('keydown');
				document.getElementById("hit").play();
				setTimeout(function () {
					document.getElementById("die").play();
				}, 450);
			};
			
		};

		$scope.runGame = function() {

			// Clear out the previous game's score
			$rootScope.currentScore = 0;

			// Checking if a High Score exists
			// if ($rootScope.highscore == null) {
			// 	$rootScope.highscore = 0;
			// }
			
			// Set up our pipes so that there's a different game every time
			var theLeft = 350;
			$scope.topBottom = [];
			
			for (var i = 0; i < 150; i++) {
				if (i % 2 == 0) {
					var extra = 20;
				} else {
					var extra = -20;
				}
				var theTop = Math.floor(Math.random()*50) + 150 + extra;
				var theBottom = theTop + 80;
				$scope.topBottom.push([theBottom, theTop, theLeft]);
				var theCssBottom = theBottom + 40;
				var theCssTop = theTop - 230;
				$(".allPipes").append('<img class="pipeTop" src="Images/pipe.png" style="top: ' + theCssTop + 'px; left: ' + theLeft + 'px;"/>');
				$(".allPipes").append('<img class="pipeBottom" src="Images/pipe.png" style="top: ' + theCssBottom + 'px; left: ' + theLeft + 'px;"/>');
				theLeft += 150;
			}

			// Run our loop for the first time
			window.requestAnimationFrame($scope.mainLoop);
			
			// Theme Song!
			document.getElementById("theme").play();
			
			

			// Keydown to jump/fly
			$(document).keydown(function(key) {
				switch(parseInt(key.which,10)) {
					// F is Pressed (Fly)
					case 70:
						
						// FIRST TIME "F" IS PRESSED
						if ($scope.gameStart) {
							// Hides the title and instructions
							$('#title').hide();
							$('#instructions').hide();

							// Moves all the pipes continuously
							$('.pipeBottom').animate({left:'-=10000px'},60000);
							$('.pipeTop').animate({left:'-=10000px'},60000);

							// Immediately falling
							$('#bird').animate({top:'+=400px'},2000);

							// Game has started
							$scope.gameStart = false;
						}
						
						// Stops previous animation
						$('#bird').stop(true,false);

						// Removes the falling class
						$('#bird').removeClass('falling');

						// Sound!
						document.getElementById("flap").play();

						// Moves up
						$('#bird').animate({top:'-=50px'},500);

						// Moves Qrappy bird back down, falling
						$('#bird').animate({top:'+=400px'},2000);
						break;
						
					// Q is Pressed (Escape the Game)
					case 81:
						$scope.$apply(function() {
							$location.url("/score");
						});
						break;
				};
			});
		};

		$scope.runGame();

	};

	gameController.$inject = ['$scope', '$routeParams', '$rootScope', '$location', '$timeout'];

	angular.module('SPAppyBird')
	    .controller('gameController', gameController);

}());