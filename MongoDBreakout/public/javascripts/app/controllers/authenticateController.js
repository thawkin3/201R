(function() {

	var authenticateController = function ($scope, $routeParams, $rootScope) {

		$(document).ready(function(){

		    $("#authetication").submit(function(){
		        var theEmail = $("#inputEmail1").val();
		        var theName = $("#inputName1").val();
		        var thePassword = $("#inputPassword1").val();

		        var myobj = {Name: theName, Email: theEmail, Password: thePassword};
		        jobj = JSON.stringify(myobj);
		        $("#json").text("Your JSON stringified user: " + jobj);
		    
		    	var url = "user";
				$.ajax({
		  			url:url,
		  			type: "POST",
		  			data: jobj,
		  			contentType: "application/json; charset=utf-8",
		  			success: function(data,textStatus) {
		      				$("#done").html("Adding your user: " + textStatus + "!");
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