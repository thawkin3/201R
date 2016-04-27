console.log("highscores.js");

$(document).ready(function(){
	
	$.ajax({
			url: "/gethighscores",
			type: "GET",
			contentType: "application/json; charset=utf-8",
			success: function(data,textStatus) {
  				for (var i = 0; i < data.length; i++) {
  					$("#highScoresTable tbody").append("<tr><td>" + data[i].Username + "</td><td>" + data[i].Score + "</td></tr>");
				}
			}
	});

});