var app = angular.module('SPAppyBird', ['ngRoute']);

app.config(function ($routeProvider){
	$routeProvider
		.when('/', {
			controller: 'gameController',
			templateUrl:'app/views/gameView.html'
		})
		.when('/score', {
			controller: 'scoreController',
			templateUrl:'app/views/scoreView.html'
		})
		.when('/highscores', {
			controller: 'highscoresController',
			templateUrl:'app/views/highscoresView.html'
		})
		.otherwise({ 
			redirectTo: '/' 
		});
});

app.run(function($rootScope) {
    $rootScope.currentScore;
    $rootScope.highScore;
    $rootScope.scores = [];
})