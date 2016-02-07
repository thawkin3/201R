var app = angular.module('theApp', ['ngRoute']);

app.config(function ($routeProvider){
	$routeProvider
		.when('/view1', {
			controller: 'view1Ctrl',
			templateUrl:'app/views/view1.html'
		})
		.when('/view2', {
			controller: 'view2Ctrl',
			templateUrl:'app/views/view2.html'
		})
		.when('/view3', {
			controller: 'view3Ctrl',
			templateUrl:'app/views/view3.html'
		})
		.otherwise({ 
			redirectTo: '/' 
		});
});