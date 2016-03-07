$(document).ready(function(){

	var words;
	var name;

	$("#firstPageForm").submit(function(){
		$("#firstPage").hide();
		$("#secondPage").show();
		name = $("#name").val();
		if (name == "") {
			name == "valued employee";
		}
		generateBS();
	});

	$("#secondPageForm").submit(function(){
		$("#secondPage").hide();
		$("#thirdPage").show();
	});

	$("#thirdPageForm").submit(function(){
		$("#thirdPage").hide();
		$("#fourthPage").show();
	});

	$("#fourthPageForm").submit(function(){
		$("#fourthPage").hide();
		$("#secondPage").show();
		generateBS();
	});

	$(window).resize(function() {
		if ($(window).innerWidth() < 600) {
			$("#mainContent").hide();
		} else {
			$("#mainContent").show();
		}
	});

	function generateBS() {
		$.getJSON("../../getwords", function(data) {
	    	words = data;
	    	console.log(words);
	    })
	    .done(function() { 
	    	$("#text1page2").html("Hey " + name + ", what do you think about " + words.nouns[0] + "? We're looking for some new ideas and need all the help we can get.");
	    	$("#text2page2").html("I think we should " + words.adverbs[0] + " " + words.verbs[0] + " " + words.nouns[0] + " so that we can " + words.adverbs[1] + " " + words.verbs[1] + " " + words.nouns[1] + ".");
	    	$("#text1page3").html("Of course! I knew I liked you " + name + ". With that idea, we'll be sure to " + words.adverbs[2] + " " + words.verbs[2] + " " + words.nouns[2] + " and " + words.adverbs[3] + " " + words.verbs[3] + " " + words.nouns[3] + " in no time.");
	    	$("#text2page3").html("Whatever you say, boss.");
	    	console.log('generated your BS!'); 
	    })
	    .fail(function(jqXHR, textStatus, errorThrown) { 
	    	console.log('failed to generate BS!' + textStatus); 
	    	console.log("incoming " + jqXHR.responseText);
	    });
	}

});