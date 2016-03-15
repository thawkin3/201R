(function() {

	var authenticateController = function ($scope, $routeParams, $rootScope) {

		$(document).ready(function(){

		    $("#createForm").submit(function(){
		        var theEmail = $("#InputEmail1").val();
		        var theName = $("#InputName1").val();
		        var thePassword = $("#InputPassword1").val();

		        var myobj = { "Name": theName, "Email": theEmail, "Password": thePassword };
		        console.log(myobj);
		        jobj = JSON.stringify(myobj);
		        console.log(jobj);
		    
		    	var url = "user";
		    	var success = false;
				$.ajax({
		  			url:url,
		  			type: "POST",
		  			data: jobj,
		  			contentType: "application/json; charset=utf-8",
		  			success: function(data,textStatus) {
		      				console.log("done");
		      				success = true;
		  			}
				})
				.fail(function(){
					alert("error!");
				});

				/*
		        $("#InputEmail1").val("");
		        $("#InputName1").val("");
		        $("#InputPassword1").val("");
		        */

			});


		});



	};

	authenticateController.$inject = ['$scope', '$routeParams', '$rootScope'];

	angular.module('MongoDBreakout')
	    .controller('authenticateController', authenticateController);

}());