(function() {
	var highscoresController = function($scope, $routeParams, $rootScope) {
		$scope.reverse = true;
		$scope.changeBg = function() {
			$('#game').css('background', '#71C5D0 url(\'Images/bg.jpg\') repeat-x center 60px');
			$('#game').css('backgroundSize', 'contain');
		};

		$scope.changeBg();
	};

	highscoresController.$inject = ['$scope', '$routeParams', '$rootScope'];

	angular.module('SPAppyBird')
	    .controller('highscoresController', highscoresController);
}());
