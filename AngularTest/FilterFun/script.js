var theApp = angular.module("theApp", ['ngAnimate']);

theApp.controller("filterCtrl", filterCtrl);
theApp.controller("repeatCtrl", repeatCtrl);
theApp.controller("httpCtrl", httpCtrl);

function filterCtrl($scope) {
	$scope.theText = "Example Text";
	$scope.theArray = ["green", "red", "blue", "purple", "yellow", "black", "pink", "orange", "white", "brown"];
	$scope.filterCriteria;
	$scope.reverse = false;
	$scope.proxy;
	$scope.ord = "none";
	$scope.theOrder = function(alpha, rev) {
		if (alpha) {
			$scope.proxy = function(x) { return x; };
		} else {
			$scope.proxy = null;
		}
		if (rev) {
			$scope.reverse = true;
		} else {
			$scope.reverse = false;
		}
	};
}

function repeatCtrl($scope) {
	$scope.people = [
		{
			"name": "Tyler",
			"age": 23
		}, {
			"name": "Kim",
			"age": 23
		}, {
			"name": "Dwight",
			"age": 1
		}
	];
}

function httpCtrl($scope, $http) {
	$http.get("states.json")
    .then(function (response) {
    	$scope.states = response.data;
    });
}




