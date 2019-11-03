$(document).ready(function () {
  $("#cityfield").keyup(function () {
    var str = $('#cityfield').val();
    if (str != "") {
      str = str.toLowerCase().trim();
      strArr = str.split(" ");
      for (var i = 0; i < strArr.length; i++) {
        strArr[i] = strArr[i][0].toUpperCase() + strArr[i].substr(1);
      }
      str = strArr.join(" ");
    }

    $.getJSON("https://students.cs.byu.edu/~clement/CS360/ajax/getcity.cgi?q=" + str, function (data) {
      var everything;
      everything = "<ul>";
      $.each(data, function (i, item) {
        everything += "<li> " + data[i].city;
      });
      everything += "</ul>";
      $("#txtHint").html(everything);
    })
      .done(function () {})
      .fail(function (jqXHR, textStatus, errorThrown) {})
      .always(function () {})
      .complete(function () {});
  });

  $("#button").click(function (e) {
    var value = $("#cityfield").val();
    value = value.toLowerCase().trim();
    valArr = value.split(" ");
    for (var i = 0; i < strArr.length; i++) {
      valArr[i] = valArr[i][0].toUpperCase() + valArr[i].substr(1);
    }
    value = valArr.join(" ");
    $("#dispcity").text(value);
    e.preventDefault();
    var theList = $("#txthint li");
    for (var i = 0; i < theList.length; i++) {
      if (theList[i].innerHTML.trim() != value) {
        theList[i].style.display = "none";
      } else {
        theList[i].style.fontWeight = "normal";
      }
    }

    // Wunderground API is now deprecated and is no longer free
    // var myurl = "https://api.wunderground.com/api/2fbe9dd598f2cfba/geolookup/conditions/q/UT/";
    // myurl += value;
    // myurl += ".json";

    // $.ajax({
    //   url: myurl,
    //   dataType: "jsonp",
    //   success: function (data) {
    //     var location = data['location']['city'];
    //     var temp_string = data['current_observation']['temperature_string'];
    //     var current_weather = data['current_observation']['weather'];
    //     var icon = data['current_observation']['icon_url'];
    //     var everything = "<ul>";
    //     everything += "<li>Location: " + location;
    //     everything += "<li>Temperature: " + temp_string;
    //     everything += "<li>Weather: " + current_weather;
    //     everything += "</ul>";
    //     everything += "<img src='" + icon + "'/>";
    //     $("#weather").html(everything);
    //   }
    // });

    // Switching to the Open Weather Map API now since the previous API is deprecated
			$.get('//api.openweathermap.org/data/2.5/weather?q=' + value + '&APPID=09806e8d424ef386111adfd1514da718&units=imperial')
      .done(function (data) {
        var everything = "<div>";
        everything += "<div>Location: " + data.name + "</div>";
        everything += "<div>Temperature: " + data.main.temp + "&deg; F</div>";
        everything += "<div>Weather: " + data.weather[0]["description"] + "</div>";
        everything += "</div>";
        everything += "<img src='//openweathermap.org/img/w/" + data.weather[0].icon + ".png'>";
        $("#weather").html(everything);
      })
      .fail(function () {
        $("#weather").text("No weather data found");
      });
  });

  $(document).on("click", "li", function () {
    $("li").css("font-weight", "normal");
    $(this).css("font-weight", "bold")
    $("#cityfield").val($(this).html().trim());
  });
});
