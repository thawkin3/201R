$(document).ready(function(){

	var endpoint = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=";

	var bgArray = ["linear-gradient(#895F8E, #353FA0) no-repeat",
					"linear-gradient(#895F8E, #EA0C0C) no-repeat",
					"linear-gradient(#0CEA5B, #fff) no-repeat",
					"linear-gradient(#EAE30C, #fff) no-repeat",
					"linear-gradient(#895F8E, #fff) no-repeat"];
	var bgCounter = 0;

	$("#searchForm").submit(function(){
		
		$("body").css("background", bgArray[bgCounter]);
		bgCounter++;
		console.log(bgCounter);
		if (bgCounter == 4) {
			bgCounter == 0;
		}

		if ($("#query").val() != "") {

			var queryText = $("#query").val();

			$.getJSON(endpoint + queryText + "&callback=?").success(function(data) {
				
				$("#container").html("");
				
				for (var key in data.query.pages) { 
					$("#container").append("<div class='article'><a target='_blank' href='https://en.wikipedia.org/?curid=" + data.query.pages[key]["pageid"] + "'><h3>" + data.query.pages[key]["title"] + "</h3></a><p><i>" + data.query.pages[key]["extract"] + "</i></p></div>");
				}
			
			}).fail(function(){
				$("#container").html("<h3>Sorry! Something's not working right now. Please check back later.</h3>");
			});

		} else {
			$("#container").html("<h3>Search to find a list of Wikipedia entries related to your topic</h3>");
		}

	});

	$("#random").click(function(){
		var randArt = Math.floor(Math.random()*999999);
		var url = "https://en.wikipedia.org/?curid=" + randArt;
		window.open(url,'_blank');
	});

	

});