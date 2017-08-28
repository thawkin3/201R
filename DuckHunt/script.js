$(document).ready(function () {
	
	var score, ducksGone, lostGame, bucket, newOrder, duckPositions;

	$(".duck").on("click", shootDuck);
	$(".laughing").on("click", shotTheDog);
	$("#playAgain").on("click", replay);
	init();

	function init () {
		score = 0;
		ducksGone = 0;
		lostGame = false;
		bucket = [5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000];
		newOrder = [];

		duckPositions = [
			{ duckNum: 1, left: "+=1100px", top: "-=900px" },
			{ duckNum: 2, left: "+=700px", top: "-=400px" },
			{ duckNum: 3, left: "+=900px", top: "-=300px" },
			{ duckNum: 4, left: "+=800px", top: "-=700px" },
			{ duckNum: 5, left: "+=1000px", top: "-=100px" },
			{ duckNum: 6, left: "-=700px", top: "-=600px" },
			{ duckNum: 7, left: "-=600px", top: "-=800px" },
			{ duckNum: 8, left: "-=1000px", top: "-=300px" },
			{ duckNum: 9, left: "-=1000px", top: "-=200px" },
			{ duckNum: 10, left: "-=1100px", top: "-=300px" }
		];

		for (var i = 0; i < 10; i++) {
			newOrder.push(getRandomFromBucket());
			setTimeout(function (x) {
				return function () {
					flyDuck(duckPositions[x].duckNum, duckPositions[x].left, duckPositions[x].top);
				};
			}(i), newOrder[i]);
		}

		$("#dog1").delay(8000).animate({top: "-=70px"}, 5000, function () {
			$("#dog1").delay(2000).animate({top: "+=70px"}, 4000);
		});

		$("#dog2").delay(22000).animate({top: "-=70px"}, 5000, function () {
			$("#dog2").delay(2000).animate({top: "+=70px"}, 4000);
		});

		$("#dog3").delay(39000).animate({top: "-=70px"}, 5000, function () {
			$("#dog3").delay(2000).animate({top: "+=70px"}, 4000);
		});
	}

	function shootDuck () {
		var duckID = $(this).attr("id").substr(4);
		$(this).stop(true, false);
		$("#dead" + duckID).stop(true, false);
		$(this).hide();
		$("#dead" + duckID).show();
		score++;
		$("#scoreDisplay").html(score);
		$("#dead" + duckID).delay(200).animate({top: "+=600px"}, 2000);
	}

	function getRandomFromBucket () {
   		var randomIndex = Math.floor(Math.random()*bucket.length);
   		return bucket.splice(randomIndex, 1)[0];
	}

	function flyDuck (duckNumber, moveLeft, moveTop) {
		if (!lostGame) {
			$("#duck" + duckNumber + ", #dead" + duckNumber).animate({left: moveLeft, top: moveTop}, 5000);
			ducksGone++;
			$("#left" + ducksGone).hide();
			if (ducksGone == 10) {
				setTimeout(function () {
					$("#finalScore").text(score);
					$("#finalScoreContainer, #playAgain").show();
				}, 7000);
			}
		}
	}

	function shotTheDog () {
		lostGame = true;
		$(".laughing, .duck").stop().hide();
		$("#finalScore").text(score);
		$("#gameOver, #playAgain, #finalScoreContainer").show();
	}

	function replay () {
		location.reload();
	}
	
});