(function() {

	var authenticateController = function ($scope, $routeParams, $rootScope, $location, $timeout) {

		$scope.showSignIn = false;
		$scope.showCreate = true;

		$(document).ready(function(){

		    $(".loginTab").click(function(){
		    	$(".errorMsg").hide();
		    	$(".missingUsername").hide();
		    	$(".missingPassword").hide();
		    	$("#createSubmit").removeClass("btn-danger");
		    	$("#signInSubmit").removeClass("btn-danger");
		    	$(".loginTab").removeClass("activeTab");
		    	$(this).addClass("activeTab");
		    	if ($(this).attr("id") == "createTab") {
		    		$scope.$apply(function(){
		    			$scope.showSignIn = false;
						$scope.showCreate = true;
					});
		    	} else {
		    		$scope.$apply(function(){
		    			$scope.showSignIn = true;
						$scope.showCreate = false;
					});
		    	}
		    });

		    $("input").on("keyup", function(){
		    	$(".errorMsg").hide();
		    	$(".missingUsername").hide();
		    	$(".missingPassword").hide();
		    });

		    $("#createForm").submit(function(e){
		        var theUsername = $("#InputName1").val().toUpperCase();
		        var thePassword = $("#InputPassword1").val().toUpperCase();

		        if (theUsername != "" && thePassword != "") {

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
						$(".errorMsg").show();
					});

				} else if (theUsername == "") {
					$(".missingUsername").show();
				} else if (thePassword == "") {
					$(".missingPassword").show();
				}

			});

			$("#signInForm").submit(function(e){
		        var theUsername = $("#inputName3").val().toUpperCase();
		        var thePassword = $("#inputPassword3").val().toUpperCase();

		        if (theUsername != "" && thePassword != "") {

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
						$(".errorMsg").show();
					});

				} else if (theUsername == "") {
					$(".missingUsername").show();
				} else if (thePassword == "") {
					$(".missingPassword").show();
				}

			});


		});



	};

	authenticateController.$inject = ['$scope', '$routeParams', '$rootScope', '$location', '$timeout'];

	angular.module('MongoDBreakout')
	    .controller('authenticateController', authenticateController);

}());