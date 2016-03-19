(function() {

	var authenticateController = function ($scope, $routeParams, $rootScope, $location, $timeout) {

		$(document).ready(function(){

		    $(".loginTab").click(function(){
		    	$(".loginTab").removeClass("activeTab");
		    	$(this).addClass("activeTab");
		    });

		    $("#createForm").submit(function(e){
		        var theUsername = $("#InputName1").val();
		        var thePassword = $("#InputPassword1").val();

		        var myobj = { "Username": theUsername, "Password": thePassword };
		        jobj = JSON.stringify(myobj);
		    
		    	var url = "adduser";
				$.ajax({
		  			url:url,
		  			type: "POST",
		  			data: jobj,
		  			contentType: "application/json; charset=utf-8",
		  			success: function(data,textStatus) {
	      				$timeout(function(){
		      				console.log("Done adding user");
		      				$rootScope.user = myobj.Username;
		      				$("#createSubmit").removeClass("btn-danger");
		      				$location.url("/game");
		      			},100);
		  			}
				})
				.fail(function(){
					$("#createSubmit").addClass("btn-danger");
				});

			});

			$("#signInForm").submit(function(e){
		        var theUsername = $("#inputEmail3").val(); // FIX THIS!!!
		        var thePassword = $("#inputPassword3").val();

		        var myobj = {"Username": theUsername, "Password": thePassword };
		        jobj = JSON.stringify(myobj);
		    
		    	var url = "getuser";
				$.ajax({
		  			url:url,
		  			type: "POST",
		  			data: jobj,
		  			contentType: "application/json; charset=utf-8",
		  			success: function(data,textStatus) {
		      			$timeout(function(){	
		      				$rootScope.user = myobj.Username;
		      				$("#signInSubmit").removeClass("btn-danger");
		      				$location.url("/game");
		      			},100);
		  			}
				})
				.fail(function(){
					$("#signInSubmit").addClass("btn-danger");
				});

			});


		});



	};

	authenticateController.$inject = ['$scope', '$routeParams', '$rootScope', '$location', '$timeout'];

	angular.module('MongoDBreakout')
	    .controller('authenticateController', authenticateController);

}());