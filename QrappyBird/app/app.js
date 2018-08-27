var app = angular.module('SPAppyBird', ['ngRoute']);

app.config(function ($routeProvider){
	$routeProvider
		.when('/', {
			controller: 'gameController',
			templateUrl: 'app/views/gameView.html',
		})
		.when('/score', {
			controller: 'scoreController',
			templateUrl: 'app/views/scoreView.html',
		})
		.when('/highscores', {
			controller: 'highscoresController',
			templateUrl: 'app/views/highscoresView.html',
		})
		.otherwise({ 
			redirectTo: '/',
		});
});

app.run(function($rootScope) {
	$rootScope.themeSong = true;
    $rootScope.currentScore = 0;
    $rootScope.highscore = 0;
    $rootScope.scores = [0, 0, 0, 0, 0];
});
