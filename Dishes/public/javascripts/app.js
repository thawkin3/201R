angular.module('dish', [])
.controller('MainCtrl', [
	'$scope', '$http',
  	function($scope, $http){
	    
	    $scope.dishes = [];

	    $scope.addDish = function() {
    		if($scope.formContent === '') { return; }
			console.log("In addComment with "+$scope.formContent);
			$scope.create({
				title: $scope.formContent,
				upvotes: 0,
			});
			$scope.formContent = '';
    	};

    	$scope.incrementUpvotes = function(comment) {
    		$scope.upvote(comment);
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
				console.log("upvote worked");
				dish.upvotes += 1;
			});
		};

		$scope.getAll();

	}
]);