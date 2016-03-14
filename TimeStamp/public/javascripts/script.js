console.log("script.js loaded");

$(document).ready(function(){

	$("#dateForm").submit(function(){

		var str = $("#theDate").val();

		$.getJSON("../gettime?q="+str, function(data) {
	    	$("#unix").html(data.unix);
	    	$("#normal").html(data.normal);
	    	if ($("#normal").html() == "") {
	    		$("#unix").html("Invalid Date");
	    		$("#normal").html("Invalid Date");
	    	}
	    })
	    .done(function() { 
	    	console.log('getJSON request succeeded!'); 
	    })
	    .fail(function(jqXHR, textStatus, errorThrown) { 
	    	console.log('getJSON request failed!' + textStatus); 
	    	console.log("incoming " + jqXHR.responseText);
	    });

	});

});