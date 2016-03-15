(function() {

	var authenticateController = function ($scope, $routeParams, $rootScope) {

		$(document).ready(function(){

		    $("#createForm").submit(function(){
		        var theEmail = $("#inputEmail1").val();
		        var theName = $("#inputName1").val();
		        var thePassword = $("#inputPassword1").val();

		        var myobj = { "Name": theName, "Email": theEmail, "Password": thePassword };
		        console.log(myobj);
		        jobj = JSON.stringify(myobj);
		        console.log(jobj);
		    
		    	var url = "user";
				$.ajax({
		  			url:url,
		  			type: "POST",
		  			data: jobj,
		  			contentType: "application/json; charset=utf-8",
		  			success: function(data,textStatus) {
		      				console.log("done");
		  			}
				});

		        $("#inputEmail1").val("");
		        $("#inputName1").val("");
		        $("#inputPassword1").val("");

			});


		});



	};

	authenticateController.$inject = ['$scope', '$routeParams', '$rootScope'];

	angular.module('MongoDBreakout')
	    .controller('authenticateController', authenticateController);

}());