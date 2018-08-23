angular.module('dish', [])
.controller('MainCtrl', [
	'$scope', '$http',
  	function($scope, $http){
	    
	    $scope.dishes = [];

	    $scope.addDish = function() {
    		if($scope.name === '' || $scope.type === '') { return; }
			$scope.create({
				name: $scope.name,
				type: $scope.type,
				upvotes: 0,
			});
			$scope.name = '';
			$scope.type = '';
    	};

    	$scope.incrementUpvotes = function(dish) {
    		$scope.upvote(dish);
    	};

    	$scope.getAll = function() {
			return $http.get('/dishes').success(function(data){
				angular.copy(data, $scope.dishes);
			});
		};

		$scope.create = function(dish) {
			return $http.post('/dishes', dish).success(function(data){
				$scope.dishes.push(data);
			});
		};

		$scope.upvote = function(dish) {
			return $http.put('/dishes/' + dish._id + '/upvote')
			.success(function(data){
				dish.upvotes += 1;
			});
		};

		$scope.getAll();

	}
]);