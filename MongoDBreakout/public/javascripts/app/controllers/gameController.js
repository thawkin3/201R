(function() {

	var gameController = function ($scope, $routeParams, $rootScope, $location, $timeout) {

		// Locator function in a loop
		$scope.mainLoop = function () {
			
			// draw our canvas here
			// have logic for the game to end or not

			var gameEnd = false;
			
			if (!gameEnd) {
				// Recursively call our loop
				window.requestAnimationFrame($scope.mainLoop);
			} else {
				// end the game and go to a new view	
			}
		};

		$scope.runGame = function() {

			// Run our loop for the first time
			window.requestAnimationFrame($scope.mainLoop);
			
		};

		$scope.runGame();

	};

	gameController.$inject = ['$scope', '$routeParams', '$rootScope', '$location', '$timeout'];

	angular.module('MongoDBreakout')
	    .controller('gameController', gameController);

}());