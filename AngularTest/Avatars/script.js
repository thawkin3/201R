var app = angular.module('app', []);

app.controller('mainCtrl', mainCtrl);
app.directive('avatar', avatarDirective);

function mainCtrl ($scope) {
  $scope.users = [
    {
      name: 'Mikey Murphy',
      avatarUrl: 'https://pbs.twimg.com/profile_images/621816592519688192/U8sbRNik.jpg'
    },
    {
      name: "Tyler Hawkins",
      avatarUrl: "https://avatars1.githubusercontent.com/u/13806458?v=3&s=460"
    }
  ];
  $scope.addNew = function (user) {
    $scope.users.push({
      name: user.name,
      avatarUrl: user.url
    });
    user.name = '';
    user.url = '';
  };
  $scope.removeUser = function (user) {
    $scope.users = $scope.users.filter(function(val) {
      return val.name != user.name;
    });
  };
}

function avatarDirective () {
  return {
    scope: {
      user: '='
    },
    restrict: 'E',
    replace: 'true',
    template: (
      '<div class="avatar">' + 
        '<img ng-src="{{user.avatarUrl}}" />' +
        '<p>{{user.name}}</p>' +
      '</div>'
    ),
    link: link
  };
  
  function link (scope) {
    if (!scope.user.avatarUrl) {
      scope.user.avatarUrl = 'http://thealmanac.org/assets/img/default_avatar.png';
    }
  }

}