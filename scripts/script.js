$(document).ready(function() {
  // Scroll animation
  $('.nav a, .separator a').click(function() {
    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top
    }, 500);
    return false;
  });

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
