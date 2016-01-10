$(document).ready(function(){
	
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(successFunction, failFunction);
	} else {
		$("h1").after("Choose City: <input id='pickCity' type='text' placeholder='Provo'><input id='go' type='submit' value='Go'>");
		$("#go").click(function(){
			weatherByCity();
		});
	}

	function successFunction(position) {
	    var lat = position.coords.latitude;
	    var long = position.coords.longitude;

	    $.get('//api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&APPID=09806e8d424ef386111adfd1514da718', function(data){
	    	$("#city").html("City: " + data.name);
	    	$("#temp").html("Temperature: " + Math.round(data.main.temp * 9/5 - 459.67) + "&deg; F");
	    	$("#icon").html("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'>");
	    	$("#weather").html(data.weather[0]["description"]);
	    });
	}

	function failFunction(position) {
		$("h1").after("Choose City: <input id='pickCity' type='text' placeholder='Provo'><input id='go' type='submit' value='Go'>");
		$("#go").click(function(){
			weatherByCity();
		});
	}

	function weatherByCity() {
		var theCity = $("pickCity").val();
		$.get('//api.openweathermap.org/data/2.5/weather?q=' + theCity + '&APPID=09806e8d424ef386111adfd1514da718', function(data){
	    	$("#city").html("City: " + data.name);
	    	$("#temp").html("Temperature: " + data.main.temp + "&deg; F");
	    	$("#icon").html("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'>");
	    	$("#weather").html(data.weather[0]["description"]);
	    });
	}



});