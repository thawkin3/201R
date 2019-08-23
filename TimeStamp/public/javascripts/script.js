$(document).ready(function(){
  $("#dateForm").submit(function(){
    var str = $("#theDate").val();

    $.getJSON("../gettime?q="+str)
      .done(function(data) {
        $("#unix").html(data.unix);
        $("#normal").html(data.normal);
        if ($("#normal").html() == "") {
          $("#unix").html("Invalid Date");
          $("#normal").html("Invalid Date");
        }
      })
      .fail(function(jqXHR, textStatus, errorThrown) { 
      });
  });

  var theSpots = document.getElementsByClassName("currentAddress");
  for (var i = 0; i < theSpots.length; i++) {
    theSpots[i].innerHTML = window.location.href;
  }
});

