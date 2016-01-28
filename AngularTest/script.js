var firstApp = angular.module('firstApp', []);
firstApp.controller('FirstController', function($scope) {
  $scope.first = 'Some';
  $scope.last = 'One';
  $scope.heading = 'Shouting is fun! ';
  $scope.uppercaser = function() {
    $scope.message = "\"" + $scope.first + ' ' + $scope.last + "!\"";
  };
});