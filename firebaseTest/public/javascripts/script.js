var myApp = angular.module("myApp", ["firebase"]);
myApp.controller("chatController", ["$scope", "$firebaseArray", 
    function($scope, $firebaseArray) { 
        // var ref = new Firebase("https://brilliant-fire-7841.firebaseio.com/");
        var ref = new Firebase("https://dazzling-inferno-8314.firebaseio.com/");
        $scope.chats = $firebaseArray(ref);
        $scope.update = function(user) { 
            var newmessage = {from:user.name || "anonymous",body:user.chat};
            console.log(newmessage);
            $scope.chats.$add(newmessage);
            user.chat = ""; 
        } 
     } 
]);
