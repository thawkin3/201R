$(document).ready(function () {
	// Scroll animation
	$(".nav a, .separator a").click(function() {
	    $("html, body").animate({
	        scrollTop: $($(this).attr("href")).offset().top
	    }, 500);
	    return false;
	});

	// Wow animations
	var wow = new WOW({
		boxClass: 'wow',
		animateClass: 'animated',
		offset: 0,
		mobile: false,
		live: false
	});
	wow.init();
});