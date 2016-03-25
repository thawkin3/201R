angular.module('song', [])
.controller('MainCtrl', [
	'$scope', '$http',
  	function($scope, $http){
	    
	    $scope.songs = [];

	    $scope.addSong = function() {
    		if ($scope.title === '' || $scope.artist === '') { 
    			return; 
    		}
    		if ($scope.album === '') {
    			$scope.album = "Album Unknown";
    		}
    		if ($scope.genre === '') {
    			$scope.genre = "Genre Unknown";
    		}
    		if ($scope.art === '') {
    			$scope.art = "genericArtwork.jpg";
    		}
			console.log("In addSong with " + $scope.title + " by " + $scope.artist + " on album " + $scope.album);
			$scope.create({
				title: $scope.title,
				artist: $scope.artist,
				album: $scope.album,
				genre: $scope.genre,
				art: $scope.art,
				upvotes: 0,
			});
			$scope.title = '';
			$scope.artist = '';
			$scope.album = '';
			$scope.genre = '';
			$scope.art = '';
    	};

    	$scope.incrementUpvotes = function(song) {
    		$scope.upvote(song);
    	};

    	$scope.getAll = function() {
			return $http.get('/songs').success(function(data){
				angular.copy(data, $scope.songs);
			});
		};

		$scope.create = function(song) {
			return $http.post('/songs', song).success(function(data){
				$scope.songs.push(data);
			});
		};

		$scope.upvote = function(song) {
			return $http.put('/songs/' + song._id + '/upvote')
			.success(function(data){
				console.log("upvote worked");
				song.upvotes += 1;
			});
		};

		$scope.getAll();

	}
]);