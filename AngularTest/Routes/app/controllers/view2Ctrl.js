(function() {
    
    var view2Ctrl = function ($scope, $routeParams) {
        $scope.name = "View 2";    
    };
    
    view2Ctrl.$inject = ['$scope', "$routeParams"];

    angular.module('theApp')
      .controller('view2Ctrl', view2Ctrl);
    
}());