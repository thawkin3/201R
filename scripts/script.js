$(document).ready(function () {
	// Scroll animation
	$('.nav a, .separator a').click(function() {
	    $('html, body').animate({
	        scrollTop: $($(this).attr('href')).offset().top
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

	// Navbar collapse fix for mobile navbar when link is clicked
	$('.navbar-nav li a').on('click', function(event) {
		$('.navbar-collapse').collapse('hide');
	});

	// Window resize fix for navbar if currently expanded
	$(window).on('resize', function(event) {
		if (window.innerWidth >= 768) {
			$('.navbar-collapse').collapse('hide');
		}
	});
});
