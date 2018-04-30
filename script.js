$(document).ready(function () {
	
	// Scroll animation
	$(".nav a, .separator a").click(function() {
	    $("html, body").animate({
	        scrollTop: $($(this).attr("href")).offset().top
	    }, 500);
	    return false;
	});

});