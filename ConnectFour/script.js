$(document).ready(function () {
	
	// Set up the board / data structure
	// Something like board[0][2] will give you the first row from the top and third column
	var board = [
		["o","o","o","o","o","o","o"],
		["o","o","o","o","o","o","o"],
		["o","o","o","o","o","o","o"],
		["o","o","o","o","o","o","o"],
		["o","o","o","o","o","o","o"],
		["o","o","o","o","o","o","o"]
	];
	
	// Click here to play
	$("#start").on("click", function () {
		$(this).hide();
	});
	
	// 1st row pieces (from bottom)
	$("#c50, #c51, #c52, #c53, #c54, #c55, #c56").on("click", function () {
		$(this).animate({top: "+=430px"}).unbind();
		if ($(this).hasClass("p2")) {
			$(this).addClass("droppedP2");
			board[$(this).attr("id").substr(1,1)][$(this).attr("id").substr(2)] = "b";
		} else {
			$(this).addClass("droppedP1");
			board[$(this).attr("id").substr(1,1)][$(this).attr("id").substr(2)] = "r";
		};
		
		var row = parseInt($(this).attr("id").substr(1,1));
		var horizontal = board[row][0] + board[row][1] + board[row][2] + board[row][3] + board[row][4] + board[row][5] + board[row][6];
		var col = parseInt($(this).attr("id").substr(2));
		var vertical = board[5][col] + board[4][col] + board[3][col] + board[2][col] + board[1][col] + board[0][col];
		var rdiag = board[row][col] + board[row-1][col+1] + board[row-2][col+2] + board[row-3][col+3] + board[row-4][col+4] + board[row-5][col+5];
		var ldiag = board[row][col] + board[row-1][col-1] + board[row-2][col-2] + board[row-3][col-3] + board[row-4][col-4] + board[row-5][col-5];
		var check = horizontal + "o" + vertical + "o" + rdiag + "o" + ldiag;
		
		setTimeout(function () {
			if (check.indexOf("rrrr") > -1) {
				$("#redWin").show();
			} else if (check.indexOf("bbbb") > -1) {
				$("#blackWin").show();
			} else {
				$(".piece").toggleClass("p2");
			}
		}, 500);
	});
	
	
	// 2nd row pieces (from bottom)
	$("#c40, #c41, #c42, #c43, #c44, #c45, #c46").on("click", function () {
		$(this).animate({top: "+=360px"}).unbind();
		if ($(this).hasClass("p2")) {
			$(this).addClass("droppedP2");
			board[$(this).attr("id").substr(1,1)][$(this).attr("id").substr(2)] = "b";
		} else {
			$(this).addClass("droppedP1");
			board[$(this).attr("id").substr(1,1)][$(this).attr("id").substr(2)] = "r";
		};
		
		var row = parseInt($(this).attr("id").substr(1,1));
		var horizontal = board[row][0] + board[row][1] + board[row][2] + board[row][3] + board[row][4] + board[row][5] + board[row][6];
		var col = parseInt($(this).attr("id").substr(2));
		var vertical = board[5][col] + board[4][col] + board[3][col] + board[2][col] + board[1][col] + board[0][col];
		var rdiag = board[row+1][col-1] + board[row][col] + board[row-1][col+1] + board[row-2][col+2] + board[row-3][col+3] + board[row-4][col+4];
		var ldiag = board[row+1][col+1] + board[row][col] + board[row-1][col-1] + board[row-2][col-2] + board[row-3][col-3] + board[row-4][col-4];
		var check = horizontal + "o" + vertical + "o" + rdiag + "o" + ldiag;
		
		setTimeout(function () {
			if (check.indexOf("rrrr") > -1) {
				$("#redWin").show();
			} else if (check.indexOf("bbbb") > -1) {
				$("#blackWin").show();
			} else {
				$(".piece").toggleClass("p2");
			}
		}, 500);
	});
	
	// 3rd row pieces (from bottom)
	$("#c30, #c31, #c32, #c33, #c34, #c35, #c36").on("click", function () {
		$(this).animate({top: "+=290px"}).unbind();
		if ($(this).hasClass("p2")) {
			$(this).addClass("droppedP2");
			board[$(this).attr("id").substr(1,1)][$(this).attr("id").substr(2)] = "b";
		} else {
			$(this).addClass("droppedP1");
			board[$(this).attr("id").substr(1,1)][$(this).attr("id").substr(2)] = "r";
		};
		
		var row = parseInt($(this).attr("id").substr(1,1));
		var horizontal = board[row][0] + board[row][1] + board[row][2] + board[row][3] + board[row][4] + board[row][5] + board[row][6];
		var col = parseInt($(this).attr("id").substr(2));
		var vertical = board[5][col] + board[4][col] + board[3][col] + board[2][col] + board[1][col] + board[0][col];
		var rdiag = board[row+2][col-2] + board[row+1][col-1] + board[row][col] + board[row-1][col+1] + board[row-2][col+2] + board[row-3][col+3];
		var ldiag = board[row+2][col+2] + board[row+1][col+1] + board[row][col] + board[row-1][col-1] + board[row-2][col-2] + board[row-3][col-3];
		var check = horizontal + "o" + vertical + "o" + rdiag + "o" + ldiag;
		
		setTimeout(function () {
			if (check.indexOf("rrrr") > -1) {
				$("#redWin").show();
			} else if (check.indexOf("bbbb") > -1) {
				$("#blackWin").show();
			} else {
				$(".piece").toggleClass("p2");
			}
		}, 500);
	});
	
	// 4th row pieces (from bottom)
	$("#c20, #c21, #c22, #c23, #c24, #c25, #c26").on("click", function () {
		$(this).animate({top: "+=220px"}).unbind();
		if ($(this).hasClass("p2")) {
			$(this).addClass("droppedP2");
			board[$(this).attr("id").substr(1,1)][$(this).attr("id").substr(2)] = "b";
		} else {
			$(this).addClass("droppedP1");
			board[$(this).attr("id").substr(1,1)][$(this).attr("id").substr(2)] = "r";
		};
		
		var row = parseInt($(this).attr("id").substr(1,1));
		var horizontal = board[row][0] + board[row][1] + board[row][2] + board[row][3] + board[row][4] + board[row][5] + board[row][6];
		var col = parseInt($(this).attr("id").substr(2));
		var vertical = board[5][col] + board[4][col] + board[3][col] + board[2][col] + board[1][col] + board[0][col];
		var rdiag = board[row+3][col-3] + board[row+2][col-2] + board[row+1][col-1] + board[row][col] + board[row-1][col+1] + board[row-2][col+2];
		var ldiag = board[row+3][col+3] + board[row+2][col+2] + board[row+1][col+1] + board[row][col] + board[row-1][col-1] + board[row-2][col-2];
		var check = horizontal + "o" + vertical + "o" + rdiag + "o" + ldiag;
		
		setTimeout(function () {
			if (check.indexOf("rrrr") > -1) {
				$("#redWin").show();
			} else if (check.indexOf("bbbb") > -1) {
				$("#blackWin").show();
			} else {
				$(".piece").toggleClass("p2");
			}
		}, 500);
	});
	
	// 5th row pieces (from bottom)
	$("#c10, #c11, #c12, #c13, #c14, #c15, #c16").on("click", function () {
		$(this).animate({top: "+=150px"}).unbind();
		if ($(this).hasClass("p2")) {
			$(this).addClass("droppedP2");
			board[$(this).attr("id").substr(1,1)][$(this).attr("id").substr(2)] = "b";
		} else {
			$(this).addClass("droppedP1");
			board[$(this).attr("id").substr(1,1)][$(this).attr("id").substr(2)] = "r";
		};
		
		var row = parseInt($(this).attr("id").substr(1,1));
		var horizontal = board[row][0] + board[row][1] + board[row][2] + board[row][3] + board[row][4] + board[row][5] + board[row][6];
		var col = parseInt($(this).attr("id").substr(2));
		var vertical = board[5][col] + board[4][col] + board[3][col] + board[2][col] + board[1][col] + board[0][col];
		var rdiag = board[row+4][col-4] + board[row+3][col-3] + board[row+2][col-2] + board[row+1][col-1] + board[row][col] + board[row-1][col+1];
		var ldiag = board[row+4][col+4] + board[row+3][col+3] + board[row+2][col+2] + board[row+1][col+1] + board[row][col] + board[row-1][col-1];
		var check = horizontal + "o" + vertical + "o" + rdiag + "o" + ldiag;
		
		setTimeout(function () {
			if (check.indexOf("rrrr") > -1) {
				$("#redWin").show();
			} else if (check.indexOf("bbbb") > -1) {
				$("#blackWin").show();
			} else {
				$(".piece").toggleClass("p2");
			}
		}, 500);
	});
	
	// 6th row pieces (from bottom)
	$("#c00, #c01, #c02, #c03, #c04, #c05, #c06").on("click", function () {
		$(this).animate({top: "+=80px"}).unbind();
		if ($(this).hasClass("p2")) {
			$(this).addClass("droppedP2");
			board[$(this).attr("id").substr(1,1)][$(this).attr("id").substr(2)] = "b";
		} else {
			$(this).addClass("droppedP1");
			board[$(this).attr("id").substr(1,1)][$(this).attr("id").substr(2)] = "r";
		};
		
		var row = parseInt($(this).attr("id").substr(1,1));
		var horizontal = board[row][0] + board[row][1] + board[row][2] + board[row][3] + board[row][4] + board[row][5] + board[row][6];
		var col = parseInt($(this).attr("id").substr(2));
		var vertical = board[5][col] + board[4][col] + board[3][col] + board[2][col] + board[1][col] + board[0][col];
		var rdiag = board[row+5][col-5] + board[row+4][col-4] + board[row+3][col-3] + board[row+2][col-2] + board[row+1][col-1] + board[row][col];
		var ldiag = board[row+5][col+5] + board[row+4][col+4] + board[row+3][col+3] + board[row+2][col+2] + board[row+1][col+1] + board[row][col];
		var check = horizontal + "o" + vertical + "o" + rdiag + "o" + ldiag;
		
		setTimeout(function () {
			if (check.indexOf("rrrr") > -1) {
				$("#redWin").show();
			} else if (check.indexOf("bbbb") > -1) {
				$("#blackWin").show();
			} else {
				$(".piece").toggleClass("p2");
			}
		}, 500);
	});
	
	// Reset game
	$("#reset").on("click", function () {
		$(".droppedP1, .droppedP2").animate({top: "+=500px"}, 2000, function () {
			$(".droppedP1, .droppedP2").hide();
			location.reload();

			// board = [
			// 		["o","o","o","o","o","o","o"],
			// 		["o","o","o","o","o","o","o"],
			// 		["o","o","o","o","o","o","o"],
			// 		["o","o","o","o","o","o","o"],
			// 		["o","o","o","o","o","o","o"],
			// 		["o","o","o","o","o","o","o"]
			// ];
			// $(".piece").removeClass("droppedP1 droppedP2");
			// $(".piece").css({
			// 		top: "0px",
			// 		display: "block"
			// 	});
			// $("#blackWin, #redWin").hide();
			// $("#start").show();
		});
	});
	
});