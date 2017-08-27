$(document).ready(function () {

	function killCopy (e) {
		return false;
	}
	function reEnable () {
		return true;
	}
	document.onselectstart = new Function ("return false")
	if (window.sidebar) {
		document.onmousedown = killCopy;
		document.onclick = reEnable;
	}
	
	var score = 0;
	var ducksGone = 0;
	var lostGame = false;
	
	// Submits the page after a minute to finish
	setTimeout(function () {
			$('#finalScore').text(score);
			$('#finalScoreContainer').show();
			setTimeout(function () {
				// $('#NextButton').click();
			}, 3000);
		}, 55000);
	
	// Click to shoot
	$('.duck').on("click", shootDuck);

	function shootDuck () {
		var duckID = $(this).attr("id").substr(4);
		$(this).stop(true, false);
		$('#dead' + duckID).stop(true, false);
		$(this).hide();
		$('#dead' + duckID).show();
		score++;
		$('#scoreDisplay').html(score);
		$('#dead' + duckID).delay(200).animate({top: '+=600px'}, 2000);
	}

	// Randomizing the order of the ducks
	var bucket = [5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000];
	var newOrder = [];
	
	function getRandomFromBucket() {
   		var randomIndex = Math.floor(Math.random()*bucket.length);
   		return bucket.splice(randomIndex, 1)[0];
	};

	for (var i = 0; i < 10; i++) {
		newOrder.push(getRandomFromBucket());
	};

	for (var i = 0; i < 10; i++) {
		// send ducks flying
	};

	
	// Moving all our ducks


	setTimeout(function () {
		var moveDuck1 = $("#duck1").animate({left: '+=1100', top: '-=900'}, 5000);
		var deadDuck1 = $("#dead1").animate({left: '+=1100', top: '-=900'}, 5000);
		ducksGone++;
		$("#left" + ducksGone).hide();
	}, newOrder[0]);
	
	setTimeout(function () {
		var moveDuck2 = $("#duck2").animate({left: '+=700', top: '-=400'}, 5000);
		var deadDuck2 = $("#dead2").animate({left: '+=700', top: '-=400'}, 5000);
		ducksGone++;
		$("#left" + ducksGone).hide();
	}, newOrder[1]);
	
	setTimeout(function () {	
		var moveDuck3 = $("#duck3").animate({left: '+=900', top: '-=300'}, 5000);
		var deadDuck3 = $("#dead3").animate({left: '+=900', top: '-=300'}, 5000);
		ducksGone++;
		$("#left" + ducksGone).hide();
	}, newOrder[2]);
	
	setTimeout(function () {
		var moveDuck4 = $("#duck4").animate({left: '+=800', top: '-=700'}, 5000);
		var deadDuck4 = $("#dead4").animate({left: '+=800', top: '-=700'}, 5000);
		ducksGone++;
		$("#left" + ducksGone).hide();
	}, newOrder[3]);
	
	setTimeout(function () {
		var moveDuck5 = $("#duck5").animate({left: '+=1000', top: '-=100'}, 5000);
		var deadDuck5 = $("#dead5").animate({left: '+=1000', top: '-=100'}, 5000);
		ducksGone++;
		$("#left" + ducksGone).hide();
	}, newOrder[4]);
	
	setTimeout(function () {	
		var moveDuck6 = $("#duck6").animate({left: '-=300', top: '-=700'}, 5000);
		var deadDuck6 = $("#dead6").animate({left: '-=300', top: '-=700'}, 5000);
		ducksGone++;
		$("#left" + ducksGone).hide();
	}, newOrder[5]);
	
	setTimeout(function () {	
		var moveDuck7 = $("#duck7").animate({left: '-=600', top: '-=800'}, 5000);
		var deadDuck7 = $("#dead7").animate({left: '-=600', top: '-=800'}, 5000);
		ducksGone++;
		$("#left" + ducksGone).hide();
	}, newOrder[6]);
	
	setTimeout(function () {
		var moveDuck8 = $("#duck8").animate({left: '-=200', top: '-=900'}, 5000);
		var deadDuck8 = $("#dead8").animate({left: '-=200', top: '-=900'}, 5000);
		ducksGone++;
		$("#left" + ducksGone).hide();
	}, newOrder[7]);
	
	setTimeout(function () {	
		var moveDuck9 = $("#duck9").animate({left: '-=1000', top: '-=200'}, 5000);
		var deadDuck9 = $("#dead9").animate({left: '-=1000', top: '-=200'}, 5000);
		ducksGone++;
		$("#left" + ducksGone).hide();
	}, newOrder[8]);
	
	setTimeout(function () {
		var moveDuck10 = $("#duck10").animate({left: '-=1100', top: '-=300'}, 5000);
		var deadDuck10 = $("#dead10").animate({left: '-=1100', top: '-=300'}, 5000);
		ducksGone++;
		$("#left" + ducksGone).hide();
	}, newOrder[9]);	
	
	
	// // Showing the ducks remaining until the game ends
	// setTimeout(function () {
	// 	$('#left1').hide();
	// }, 5000);
	
	// setTimeout(function () {
	// 	$('#left2').hide();
	// }, 10000);
	
	// setTimeout(function () {
	// 	$('#left3').hide();
	// }, 15000);
	
	// setTimeout(function () {
	// 	$('#left4').hide();
	// }, 20000);
	
	// setTimeout(function () {
	// 	$('#left5').hide();
	// }, 25000);
	
	// setTimeout(function () {
	// 	$('#left6').hide();
	// }, 30000);
	
	// setTimeout(function () {
	// 	$('#left7').hide();
	// }, 35000);
	
	// setTimeout(function () {
	// 	$('#left8').hide();
	// }, 40000);
	
	// setTimeout(function () {
	// 	$('#left9').hide();
	// }, 45000);
	
	// setTimeout(function () {
	// 	$('#left10').hide();
	// }, 50000);
	
	
	// Don't shoot your dog!
	$('.laughing').on("click", function () {
		$(this).hide();
		$('.duck').stop().hide();
		$('#gameOver').show();
	});
	
	// Dog laughing
	$('#dog1').delay(8000).animate({top: '-=70px'}, 5000, function () {
		$('#dog1').delay(2000).animate({top: '+=70px'}, 4000);
	});

	$('#dog2').delay(22000).animate({top: '-=70px'}, 5000, function () {
		$('#dog2').delay(2000).animate({top: '+=70px'}, 4000);
	});

	$('#dog3').delay(39000).animate({top: '-=70px'}, 5000, function () {
		$('#dog3').delay(2000).animate({top: '+=70px'}, 4000);
	});
	
});