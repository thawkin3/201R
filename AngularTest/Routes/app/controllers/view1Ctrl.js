(function() {
    
    var view1Ctrl = function ($scope, $routeParams) {
        $scope.name = "View 1";    
    };
    
    view1Ctrl.$inject = ['$scope', '$routeParams'];

    angular.module('theApp')
      .controller('view1Ctrl', view1Ctrl);
    
}());