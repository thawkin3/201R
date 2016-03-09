var app = angular.module('MongoDBreakout', ['ngRoute']);

app.config(function ($routeProvider){
	$routeProvider
		.when('/', {
			controller: 'authenticateController',
			templateUrl:'public/javascripts/app/views/authenticateView.html'
		})
		.when('/game', {
			controller: 'gameController',
			templateUrl:'public/javascripts/app/views/gameView.html'
		})
		.when('/highscores', {
			controller: 'highscoresController',
			templateUrl:'public/javascripts/app/views/highscoresView.html'
		})
		.otherwise({ 
			redirectTo: '/' 
		});
});

app.run(function($rootScope) {
	// root scope variables go here, if needed
})