$(document).ready(function(){

	$("#firstPageForm").submit(function(){
		$("#firstPage").hide();
		$("#secondPage").show();
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