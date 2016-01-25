var app = angular.module('myApp', []); 
    app.controller('listCtrl', function($scope) {
        $scope.namesList = [{listText:'The Child ---> The Father & The Mother', done:true}];
        $scope.child = "";
        $scope.father = "";
        $scope.mother = "";

        $scope.add = function() {
            if ($scope.child != "") {
                if ($scope.father == "") { $scope.father = "unknown"; }
                if ($scope.mother == "") { $scope.mother = "unknown"; }
                $scope.namesList.push({listText:$scope.child + " ---> " + $scope.father + " & " + $scope.mother, done:false});
                $scope.child = "";
                $scope.father = "";
                $scope.mother = "";
                $("#father").focus();
            }
        };

        $scope.remove = function() {
            var oldList = $scope.namesList;
            $scope.namesList = [];
            angular.forEach(oldList, function(x) {
                if (!x.done) $scope.namesList.push(x);
            });
        };
    });