(function() {
	var scoreController = function($scope, $routeParams, $rootScope) {
		$scope.changeBg = function() {
			$('#game').css('background', '#70C4CE');
		}
		$scope.changeBg();	
	};

	scoreController.$inject = ['$scope', '$routeParams', '$rootScope'];

	angular.module('SPAppyBird')
	    .controller('scoreController', scoreController);
}());
