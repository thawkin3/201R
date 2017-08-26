$(document).ready(function () {
	
	var board = [
		["o","o","o","o","o","o","o"],
		["o","o","o","o","o","o","o"],
		["o","o","o","o","o","o","o"],
		["o","o","o","o","o","o","o"],
		["o","o","o","o","o","o","o"],
		["o","o","o","o","o","o","o"]
	];
	
	$("#start").on("click", startGame);
	$(".piece").on("click", playPiece);
	$("#reset").on("click", resetGame);

	function startGame () {
		$(this).hide();
	}

	function playPiece () {
		
		var row = parseInt($(this).attr("id").substr(1,1));
		var col = parseInt($(this).attr("id").substr(2));

		var topValue = 80 + (row * 70);
		$(this).animate({top: "+=" + topValue + "px"}).off("click", playPiece);
		
		if ($(this).hasClass("p2")) {
			$(this).addClass("droppedP2");
			board[row][col] = "b";
		} else {
			$(this).addClass("droppedP1");
			board[row][col] = "r";
		};
		
		var horizontal = "", vertical = "", rdiag = "", ldiag = "";
		for (var i = -6; i < 7; i++) {
			if (typeof board[row][i] != "undefined") {
				horizontal += board[row][i];
			}
			if (typeof board[i] != "undefined") {
				vertical += board[i][col];
			}
			if (typeof board[row+i] != "undefined" && typeof board[row+i][col-i] != "undefined") {
				rdiag += board[row+i][col-i];
			}
			if (typeof board[row+i] != "undefined" && typeof board[row+i][col+i] != "undefined") {
				ldiag += board[row+i][col+i];
			}
		}
		var check = horizontal + "o" + vertical + "o" + rdiag + "o" + ldiag;
		
		if (check.indexOf("rrrr") > -1) {
			$("#redWin").show();
		} else if (check.indexOf("bbbb") > -1) {
			$("#blackWin").show();
		} else {
			$(".piece").toggleClass("p2");
		}
	}

	function resetGame () {
		$(".droppedP1, .droppedP2").animate({top: "+=500px"}, 2000, function () {
			$(".droppedP1, .droppedP2").hide();

			board = [
				["o","o","o","o","o","o","o"],
				["o","o","o","o","o","o","o"],
				["o","o","o","o","o","o","o"],
				["o","o","o","o","o","o","o"],
				["o","o","o","o","o","o","o"],
				["o","o","o","o","o","o","o"]
			];
			$(".piece").removeClass("droppedP1 droppedP2").toggleClass("p2");
			$(".piece").css({
					top: "0px",
					display: "block"
				});
			$(".piece").off("click", playPiece).on("click", playPiece);
			$("#blackWin, #redWin").hide();
			$("#start").show();
		});
	}
	
});