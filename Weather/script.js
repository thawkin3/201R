$(document).ready(function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeatherFromCoordinates, createForm);
  } else {
    createForm();
  }

  function createForm() {
    $("#loading").hide();
    $("h1").after("<form id='searchForm'><label>Choose City: <input id='pickCity' type='text' placeholder='Provo' /></label><input id='go' type='submit' value='Go' /></form>");
    $("#searchForm").submit(function (e) {
      e.preventDefault();
      getWeatherByCity();
    });
  }

  function getWeatherFromCoordinates(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    $.get('//api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&APPID=09806e8d424ef386111adfd1514da718&units=imperial', function (data) {
      $("#loading").hide();
      $("#city").html("City: " + data.name);
      $("#temp").html("Temperature: " + data.main.temp + "&deg; F");
      $("#icon").html("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'>");
      $("#weather").html(data.weather[0]["description"]);
    });
  }

  function getWeatherByCity() {
    var theCity = $("#pickCity").val();
    $.get('//api.openweathermap.org/data/2.5/weather?q=' + theCity + '&APPID=09806e8d424ef386111adfd1514da718&units=imperial', function (data) {
      $("#city").html("City: " + data.name);
      $("#temp").html("Temperature: " + data.main.temp + "&deg; F");
      $("#icon").html("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'>");
      $("#weather").html(data.weather[0]["description"]);
    });
  }
});
