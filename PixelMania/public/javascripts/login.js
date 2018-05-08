$(document).ready(function(){

	$("#loginForm").submit(function(){
		var username = $("#username").val().toUpperCase() || "GUEST";
		$.cookie("username", username);
		$("#username").val("");
		window.location.pathname = "/";
	});

});
