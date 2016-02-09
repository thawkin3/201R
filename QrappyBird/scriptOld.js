// Clear out the previous game's score
sessionStorage.removeItem("thisScore");
sessionStorage.setItem("thisScore", 0);

// Checking if a High Score exists
if (sessionStorage.getItem("highScore") == null) {
	sessionStorage.setItem("highScore", 0);	
}

$(document).ready(function() {
	
	// Set up our pipes so that there's a different game every time
	var theLeft = 350;
	var topBottom = [];

	for (var i = 0; i < 150; i++) {
		if (i % 2 == 0) {
			var extra = 20;
		} else {
			var extra = -20;
		}
		var theTop = Math.floor(Math.random()*50) + 150 + extra;
		var theBottom = theTop + 80;
		topBottom.push([theBottom, theTop, theLeft]);
		var theCssBottom = theBottom + 40;
		var theCssTop = theTop - 230;
		$(".allPipes").append('<img class="pipeTop" src="Images/pipe.png" style="top: ' + theCssTop + 'px; left: ' + theLeft + 'px;"/>');
		$(".allPipes").append('<img class="pipeBottom" src="Images/pipe.png" style="top: ' + theCssBottom + 'px; left: ' + theLeft + 'px;"/>');
		theLeft += 150;
	}

	// Locator function in a loop
	var mainLoop = function () {
		
		var ourArray = document.getElementsByClassName("pipeBottom");
		
		for(var i = 0; i < ourArray.length; i++) {
			if(parseInt(ourArray[i].style.left) >= 75 & parseInt(ourArray[i].style.left) <= 140) {
				var birdPos = parseInt(document.getElementById("bird").style.top);
				if (birdPos > topBottom[i][0] | birdPos < topBottom[i][1]) {
					document.getElementById("theme").pause();
					var gameEnd = true;
					var yourScore = i;
					sessionStorage.setItem("thisScore", yourScore);
				};
				break;
			};
		};
		
		if (!gameEnd) {
			// Recursively call our loop
			window.requestAnimationFrame(mainLoop);
		} else {
			// Stop all our animations
			$('#bird').stop(true,false);
			$('.pipeTop').stop(true,false);
			$('.pipeBottom').stop(true,false);

			// Die
			$('#bird').addClass("dead");
			$('#bird').animate({top:'+=1000px'},3000);
			$(document).unbind('keydown');
			document.getElementById("hit").play();
			setTimeout(function () {
				document.getElementById("die").play();
			}, 450);
			// THIS NEEDS REVISTING NOW THAT IT'S NOT IN QUALTRICS
			setTimeout(function () {
				$('#NextButton').click();
			}, 2000);
		};
		
	};
	
	// Run our loop for the first time
	window.requestAnimationFrame(mainLoop);
	
	// Theme Song!
	document.getElementById("theme").play();
	
	// Variable for the game start
	var gameStart = true;

	// Keydown to jump/fly
	$(document).keydown(function(key) {
		switch(parseInt(key.which,10)) {
				// F is Pressed (Fly)
			case 70:
				
				// FIRST TIME "F" IS PRESSED
				if (gameStart) {
					// Hides the title and instructions
					$('.title').hide();
					$('.instructions').hide();

					// Moves all the pipes continuously
					$('.pipeBottom').animate({left:'-=10000px'},60000);
					$('.pipeTop').animate({left:'-=10000px'},60000);

					// Immediately falling
					$('#bird').animate({top:'+=400px'},2000);

					// Game has started
					gameStart = false;
				}
				
				// Stops previous animation
				$('#bird').stop(true,false);

				// Removes the falling class
				$('#bird').removeClass('falling');

				// Sound!
				document.getElementById("flap").play();

				// Moves up
				$('#bird').animate({top:'-=50px'},500);

				// Moves Qrappy bird back down, falling
				$('#bird').animate({top:'+=400px'},2000);
				break;
				
				// Q is Pressed (Escape the Game)
			case 81:
				// THIS NEEDS REVISTING NOW THAT IT'S NOT IN QUALTRICS
				$('#NextButton').click();
				break;
		};
	});
});