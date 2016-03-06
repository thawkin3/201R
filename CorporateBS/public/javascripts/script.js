$(document).ready(function(){

	var words;

	$("#firstPageForm").submit(function(){
		$("#firstPage").hide();
		$("#secondPage").show();

		$.getJSON("../../getwords", function(data) {
	    	words = data;
	    	console.log(words);
	    })
	    .done(function() { 
	    	console.log('generated your BS!'); 
	    })
	    .fail(function(jqXHR, textStatus, errorThrown) { 
	    	console.log('failed to generate BS!' + textStatus); 
	    	console.log("incoming " + jqXHR.responseText);
	    });
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
	});

	$(window).resize(function() {
		if ($(window).innerWidth() < 600) {
			$("#mainContent").hide();
		} else {
			$("#mainContent").show();
		}
	});

});