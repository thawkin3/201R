(function() {

	var highscoresController = function ($scope, $routeParams, $rootScope) {
		$scope.reverse = true;		
	};

	highscoresController.$inject = ['$scope', '$routeParams', '$rootScope'];

	angular.module('SPAppyBird')
	    .controller('highscoresController', highscoresController);

}());