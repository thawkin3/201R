(function() {

	var authenticateController = function ($scope, $routeParams, $rootScope, $location) {

		$(document).ready(function(){

		    $("#createForm").submit(function(e){
		        var theEmail = $("#InputEmail1").val();
		        var theName = $("#InputName1").val();
		        var thePassword = $("#InputPassword1").val();

		        var myobj = { "Name": theName, "Email": theEmail, "Password": thePassword };
		        console.log(myobj);
		        jobj = JSON.stringify(myobj);
		        console.log(jobj);
		    
		    	var url = "adduser";
				$.ajax({
		  			url:url,
		  			type: "POST",
		  			data: jobj,
		  			contentType: "application/json; charset=utf-8",
		  			success: function(data,textStatus) {
		      				console.log("done");
		      				$rootScope.user = jobj.Name;
		      				$("#createSubmit").removeClass("btn-danger");
		      				$location.url("/game");
		  			}
				})
				.fail(function(){
					$("#createSubmit").addClass("btn-danger");
				});

			});

			$("#signInForm").submit(function(e){
		        var theEmail = $("#inputEmail3").val();
		        var thePassword = $("#inputPassword3").val();

		        var myobj = {"Email": theEmail, "Password": thePassword };
		        console.log(myobj);
		        jobj = JSON.stringify(myobj);
		        console.log(jobj);
		    
		    	var url = "getuser";
				$.ajax({
		  			url:url,
		  			type: "POST",
		  			data: jobj,
		  			contentType: "application/json; charset=utf-8",
		  			success: function(data,textStatus) {
		      				console.log("done");
		      				console.log($rootScope.user);
		      				console.log(myobj);
		      				console.log(myobj.Email);
		      				$rootScope.user = myobj.Email;
		      				$("#signInSubmit").removeClass("btn-danger");
		      				alert("found you!");
		      				$location.url("/game");
		  			}
				})
				.fail(function(){
					$("#signInSubmit").addClass("btn-danger");
				});

			});


		});



	};

	authenticateController.$inject = ['$scope', '$routeParams', '$rootScope', '$location'];

	angular.module('MongoDBreakout')
	    .controller('authenticateController', authenticateController);

}());