(function() {
    
    var view3Ctrl = function ($scope, $routeParams) {
        $scope.name = "View 3";    
    };
    
    view3Ctrl.$inject = ['$scope', '$routeParams'];

    angular.module('theApp')
      .controller('view3Ctrl', view3Ctrl);
    
}());