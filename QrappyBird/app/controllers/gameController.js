(function() {
	var gameController = function($scope, $routeParams, $rootScope, $location, $timeout) {
		$scope.changeBg = function() {
			$('#game').css('background', '#71C5D0 url(\'Images/bg.jpg\') repeat-x center 60px');
			$('#game').css('backgroundSize', 'contain');
		};
		$scope.changeBg();

		// Array to hold some pipe limits in
		$scope.topBottom;

		// Variables for the game start
		$scope.gameStart = true;
		$scope.countClicks = 0;

		// Locator function in a loop
		$scope.mainLoop = function() {
			
			var ourArray = document.getElementsByClassName('pipeBottom');

			for(var i = 0; i < ourArray.length; i++) {
				if(parseInt(ourArray[i].style.left) >= 75 & parseInt(ourArray[i].style.left) <= 140) {
					var birdPos = parseInt(document.getElementById('bird').style.top);
					if (birdPos > $scope.topBottom[i][0] | birdPos < $scope.topBottom[i][1]) {
						var gameEnd = true;
						$rootScope.scores.push($rootScope.currentScore);
						if ($rootScope.currentScore > $rootScope.highscore) {
							$rootScope.$apply(function() {
								$rootScope.highscore = $rootScope.currentScore;
							});
						}
						$timeout(function() {
							$location.url('/score');
						}, 2000);
					}
					break;
				}

				if(parseInt(ourArray[i].style.left) >= 25 & parseInt(ourArray[i].style.left) <= 75) {
					$rootScope.$apply(function() {
						$rootScope.currentScore = i + 1;
					});
				}
			};
			
			if (!gameEnd) {
				// Recursively call our loop
				window.requestAnimationFrame($scope.mainLoop);
			} else {
				// Stop all our animations
				$('#bird').stop(true, false);
				$('.pipeTop').stop(true, false);
				$('.pipeBottom').stop(true, false);

				// Die
				$('#bird').addClass('dead');
				$('#bird').animate({ top: '+=1000px' }, 3000);
				$(document).unbind('keydown');
				document.getElementById('hit').play();
				setTimeout(function() {
					document.getElementById('die').play();
				}, 450);
			};
		};

		$scope.runGame = function() {
			// Clear out the previous game's score
			$rootScope.currentScore = 0;
			
			// Set up our pipes so that there's a different game every time
			var theLeft = 700;
			$scope.topBottom = [];
			
			for (var i = 0; i < 150; i++) {
				if (i % 2 == 0) {
					var extra = 20;
				} else {
					var extra = -20;
				}
				var theTop = Math.floor(Math.random() * 50) + 150 + extra;
				var theBottom = theTop + 80;
				$scope.topBottom.push([theBottom, theTop, theLeft]);
				var theCssBottom = theBottom + 40;
				var theCssTop = theTop - 230;
				$('.allPipes').append('<img class="pipeTop" src="Images/pipe.png" style="top: ' + theCssTop + 'px; left: ' + theLeft + 'px;"/>');
				$('.allPipes').append('<img class="pipeBottom" src="Images/pipe.png" style="top: ' + theCssBottom + 'px; left: ' + theLeft + 'px;"/>');
				theLeft += 150;
			}

			// Run our loop for the first time
			window.requestAnimationFrame($scope.mainLoop);
			
			// Theme Song!
			if ($rootScope.themeSong) {
				$('#playTheme').html('Pause Theme Song');
				if (document.getElementById('theme').currentTime > 140 || document.getElementById('theme').currentTime == 0) {
					document.getElementById('theme').currentTime = 0;
					var playPromise = document.getElementById('theme').play();
					playPromise
						.catch(function() {
							$('#playTheme').html('Play Theme Song');
							$rootScope.$apply(function() {
								$rootScope.themeSong = false;
							});
						});
				}
			} else {
				$('#playTheme').html('Play Theme Song');
			}

			$('#playTheme').click(function() {
				if (!$rootScope.themeSong) {
					$('#playTheme').html('Pause Theme Song');
					var playPromise = document.getElementById('theme').play();
					playPromise
						.catch(function() {
							$('#playTheme').html('Play Theme Song');
						});
				} else {
					$('#playTheme').html('Play Theme Song');
					document.getElementById('theme').pause();
				}
				$rootScope.$apply(function() {
					$rootScope.themeSong = !$rootScope.themeSong;
				});
			});

			// Keydown to jump/fly
			$(document).keydown(function(key) {
				switch(parseInt(key.which, 10)) {
					// F is Pressed (Fly)
					case 70:
						// FIRST TIME "F" IS PRESSED
						if ($scope.gameStart) {
							// Hides the title and instructions
							$('#title').hide();
							$('#instructions').hide();

							// Moves all the pipes continuously
							$('.pipeBottom').animate({ left: '-=10000px' }, 80000, 'linear');
							$('.pipeTop').animate({ left: '-=10000px' }, 80000, 'linear');

							// Immediately falling
							$('#bird').animate({ top:'+=400px' }, 2000);

							// Game has started
							$scope.gameStart = false;
						}
						
						// Stops previous animation
						$('#bird').stop(true, false);

						// Removes the falling class
						$('#bird').removeClass('falling');

						// Sound!
						document.getElementById('flap').play();

						// Moves up
						$('#bird').animate({ top: '-=50px' }, 500);

						// Moves Qrappy bird back down, falling
						$('#bird').animate({ top: '+=400px' }, 2000);
						break;
					default:
						// do nothing
				};
			});
		};

		$scope.runGame();
	};

	gameController.$inject = ['$scope', '$routeParams', '$rootScope', '$location', '$timeout'];

	angular.module('SPAppyBird')
	    .controller('gameController', gameController);
}());
