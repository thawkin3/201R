(function() {

	var highscoresController = function ($scope, $routeParams, $rootScope) {

			$.ajax({
	  			url: "/getHighScores",
	  			type: "GET",
	  			contentType: "application/json; charset=utf-8",
	  			success: function(data,textStatus) {
	      				console.log("done in front end");
	      				console.log(data);
	  			}
			})


	};

	highscoresController.$inject = ['$scope', '$routeParams', '$rootScope'];

	angular.module('MongoDBreakout')
	    .controller('highscoresController', highscoresController);

}());