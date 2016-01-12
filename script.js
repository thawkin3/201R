$(document).ready(function(){
	
	$('a').click(function(){
	    $('html, body').animate({
	        scrollTop: $( $(this).attr('href') ).offset().top
	    }, 500);
	    return false;
	});

	$("#myName").click(function(){
		$(this).animate({
		    fontSize: "+=20px"
		}, 3000);
		$(this).animate({
		    fontSize: "-=20px"
		}, 3000);
	});

});