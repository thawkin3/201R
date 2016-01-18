$(document).ready(function(){

	var userTurn = false;
	var pattern = [];
	var colorOptions = ["green", "red", "yellow", "blue"];
	var userClicked = [];
	
	function addColor() {
		userTurn = false;
		$(".color").css("cursor", "inherit");
		userClicked = [];
		counter = 0;
		pattern.push(colorOptions[Math.floor(Math.random()*4)]);
		console.log("pattern array: " + pattern);
		if ($("#startOrCount").html() != "start") {
			$("#startOrCount").html(pattern.length);
		}
	}

	function doSetTimeout(i) {
	  	setTimeout(function() { 
	  		var that = $("#"+pattern[i]);
	  		document.getElementById(pattern[i] + "Audio").play();
			var theColor = that.css("backgroundColor").replace("0.6", "1.0");
			that.css("backgroundColor", theColor);
			setTimeout(function(){
				theColor = that.css("backgroundColor").replace(")", ", 0.6)");
				that.css("backgroundColor", theColor);
			}, 500);
	  	}, 1000 * i);
	}

	function showColors() {
		for (var i = 0; i < pattern.length; i++) {
		  doSetTimeout(i);
		}
		userTurn = true;
		$(".color").css("cursor", "pointer");
	}

	$("#startOrCount").click(function(){
		if ($(this).html() == "start") {
			
			if ($(document).width() > 500) {
				document.getElementById("greenAudio").play();
				setTimeout(function(){document.getElementById("redAudio").play();}, 200);
				setTimeout(function(){document.getElementById("yellowAudio").play();}, 400);
				setTimeout(function(){document.getElementById("blueAudio").play();}, 600);
			}

			pattern = [];
			$("#green").css("backgroundColor", "rgba(30, 204, 30, 0.6)");
			$("#red").css("backgroundColor", "rgba(255,0,0,0.6)");
			$("#yellow").css("backgroundColor", "rgba(255,255,0,0.6)");
			$("#blue").css("backgroundColor", "rgba(0,0,255,0.6)");
			$("#startOrCount").css("cursor", "inherit");
			$(".color").css("cursor", "pointer");
			addColor();
			$(this).html(1);
			setTimeout(showColors, 2000);
		}
	});

	$(".color").click(function(){
		if (userTurn == true) {
			var that = $(this);
			var theColor = that.css("backgroundColor").replace("0.6", "1.0");
			that.css("backgroundColor", theColor);
			document.getElementById(that.attr("id") + "Audio").play();
			
			userClicked.push(that.attr("id"));
			console.log("user array: " + userClicked);
			if (userClicked[counter] != pattern[counter]) {
				console.log("game over!");
				userTurn = false;
				document.getElementById("greenAudio").play();
				document.getElementById("redAudio").play();
				document.getElementById("yellowAudio").play();
				document.getElementById("blueAudio").play();
				$("#green").css("backgroundColor", "rgba(30, 204, 30, 1.0)");
				$("#red").css("backgroundColor", "rgba(255,0,0,1.0)");
				$("#yellow").css("backgroundColor", "rgba(255,255,0,1.0)");
				$("#blue").css("backgroundColor", "rgba(0,0,255,1.0)");
				setTimeout(function(){
					$("#green").css("backgroundColor", "rgba(30, 204, 30, 0.6)");
					$("#red").css("backgroundColor", "rgba(255,0,0,0.6)");
					$("#yellow").css("backgroundColor", "rgba(255,255,0,0.6)");
					$("#blue").css("backgroundColor", "rgba(0,0,255,0.6)");
					$("#"+pattern[counter])
					setTimeout(function(){
						var that = $("#"+pattern[counter]);
						var theColor = that.css("backgroundColor").replace("0.6", "1.0");
						that.css("backgroundColor", theColor);
						$("#startOrCount").html("start").css("cursor", "pointer");
						$(".color").css("cursor", "inherit");
					}, 500);
				}, 2000);
				return;
			}

			setTimeout(function(){
				theColor = that.css("backgroundColor").replace(")", ", 0.6)");
				that.css("backgroundColor", theColor);
			}, 500);
			counter++;
			console.log("userClicked length: " + userClicked.length);
			console.log("pattern length: " + pattern.length);
			if (userClicked.length == pattern.length) {
				setTimeout(addColor, 600);
				setTimeout(showColors, 1000);
			}
		}
	});

});