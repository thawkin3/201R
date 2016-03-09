var app = angular.module('MongoDBreakout', ['ngRoute']);

app.config(function ($routeProvider){
	$routeProvider
		.when('/', {
			controller: 'authenticateController',
			templateUrl:'app/views/authenticateView.html'
		})
		.when('/game', {
			controller: 'gameController',
			templateUrl:'app/views/gameView.html'
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
	// root scope variables go here, if needed
})