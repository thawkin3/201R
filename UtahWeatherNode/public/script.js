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

        $.getJSON("../getcity?q="+str, function(data) {
	    	var everything;
	    	everything = "<ul>";
	    	$.each(data, function(i, item) {
	      		everything += "<li> "+data[i].city;
	    	});
	    	everything += "</ul>";
	    	$("#txtHint").html(everything);
	    })
	    .done(function() { 
	    })
	    .fail(function(jqXHR, textStatus, errorThrown) { 
	    })
	    .always(function() { 
	    })
	    .complete(function() { 
		});

    });

    $("#searchForm").submit(function (e) {
		
		var value = $("#cityfield").val();
		value = value.toLowerCase().trim();
		if (value != "") {
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

			var myurl= "https://api.wunderground.com/api/2fbe9dd598f2cfba/geolookup/conditions/q/UT/";
			myurl += value;
			myurl += ".json";

			$.ajax({
			  	url : myurl,
			  	dataType : "jsonp",
			  	success : function(data) {
			    	var location = data['location']['city'];
			    	var temp_string = data['current_observation']['temperature_string'];
			    	var current_weather = data['current_observation']['weather'];
			    	var icon = data['current_observation']['icon_url'];
			    	everything = "<ul>";
			    	everything += "<li>Location: " + location;
			    	everything += "<li>Temperature: " + temp_string;
			    	everything += "<li>Weather: " + current_weather;
			    	everything += "</ul>";
			    	everything += "<img src='" + icon + "'/>";
			    	$("#weather").html(everything);
		  		}
			});
		}

	});

	$(document).on("click", "li", function () {
		$("li").css("font-weight", "normal");
		$(this).css("font-weight", "bold")
		$("#cityfield").val($(this).html().trim());
		$("#button").focus();
		$("#searchForm").submit();
	});

});