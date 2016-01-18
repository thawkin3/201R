// some global variables I'll need
	var piecePlayer;
	var pieceComp;
	var board;
	var gameOver;
	var nMoves;
	var playerMoves;
	var compMoves;

$(document).ready(function(){

	// function to check for a winner
	function checkWinner() {
		if (nMoves > 4) {
			if (board[0][0] != "u" && board[0][0] == board[0][1] && board[0][1] == board[0][2]) {
				return true;
			} else if (board[1][0] != "u" && board[1][0] == board[1][1] && board[1][1] == board[1][2]) {
				return true;
			} else if (board[2][0] != "u" && board[2][0] == board[2][1] && board[2][1] == board[2][2]) {
				return true;
			} else if (board[0][0] != "u" && board[0][0] == board[1][0] && board[1][0] == board[2][0]) {
				return true;
			} else if (board[0][1] != "u" && board[0][1] == board[1][1] && board[1][1] == board[2][1]) {
				return true;
			} else if (board[0][2] != "u" && board[0][2] == board[1][2] && board[1][2] == board[2][2]) {
				return true;
			} else if (board[0][0] != "u" && board[0][0] == board[1][1] && board[1][1] == board[2][2]) {
				return true;
			} else if (board[0][2] != "u" && board[0][2] == board[1][1] && board[1][1] == board[2][0]) {
				return true;
			}
		}
		return false;
	}

	// start a new game
	$(document).on('click', '.start', function(){
		$("#container").html("<h3>Choose X's or O's</h3>");
		$("#container").append("<h3 class='buttons choice'>X</h3><h3 class='buttons choice'>O</h3>");
		gameOver = false;
		nMoves = 0;
		board = [
					["u","u","u"],
					["u","u","u"],
					["u","u","u"]
				];
		playerMoves = [];
		compMoves = [];
	});

	// choose X's or O's
	$(document).on('click', '.choice', function(){
		if ($(this).html() == "X") {
			piecePlayer = "X";
			pieceComp = "O";
		} else {
			piecePlayer = "O";
			pieceComp = "X";
		}
		// build game board
		$("#container").html("<div id='gameBoard'></div>");
		for (var i = 0; i < 9; i++) {
			$("#gameBoard").append("<div class='cell' id='cell" + i + "'></div>");
		}
		// computer's first move, corners or middle only
		var possibleMoves = [0, 2, 4, 6, 8];
		var compCell = possibleMoves[Math.floor(Math.random()*5)];
		compMoves.push(compCell);
		console.log("Computer moves: " + compMoves);
		// update the game board backend
		switch (compCell) {
			case 0:
				board[0][0] = pieceComp;
				break;
			case 1:
				board[0][1] = pieceComp;
				break;
			case 2:
				board[0][2] = pieceComp;
				break;
			case 3:
				board[1][0] = pieceComp;
				break;
			case 4:
				board[1][1] = pieceComp;
				break;
			case 5:
				board[1][2] = pieceComp;
				break;
			case 6:
				board[2][0] = pieceComp;
				break;
			case 7:
				board[2][1] = pieceComp;
				break;
			case 8:
				board[2][2] = pieceComp;
				break;
			default:
				console.log("error in choice");
		}
		// update the game board front end
		if (pieceComp == "X") {
			$("#cell"+compCell).append("<p class='X'>X</p>");
		} else if (pieceComp == "O") {
			$("#cell"+compCell).append("<p class='O'>O</p>");
		}
		// increment the total number of moves in the game
		nMoves++;
		console.log(board);
		console.log(nMoves);
	});

	// pick a spot to go
	$(document).on('click', '.cell', function(){
		if ($(this).html() == "" && gameOver == false) {
			// update the game board backend
			var chosenCell = parseInt(this.id.substr(4));
			playerMoves.push(chosenCell);
			console.log("Player moves: " + playerMoves);
			switch (chosenCell) {
				case 0:
					board[0][0] = piecePlayer;
					break;
				case 1:
					board[0][1] = piecePlayer;
					break;
				case 2:
					board[0][2] = piecePlayer;
					break;
				case 3:
					board[1][0] = piecePlayer;
					break;
				case 4:
					board[1][1] = piecePlayer;
					break;
				case 5:
					board[1][2] = piecePlayer;
					break;
				case 6:
					board[2][0] = piecePlayer;
					break;
				case 7:
					board[2][1] = piecePlayer;
					break;
				case 8:
					board[2][2] = piecePlayer;
					break;
				default:
					console.log("error in choice");
			}
			// update the game board front end
			if (piecePlayer == "X") {
				$(this).append("<p class='X'>X</p>");
			} else if (piecePlayer == "O") {
				$(this).append("<p class='O'>O</p>");
			}
			// increment the total number of moves in the game
			nMoves++;
			console.log(board);
			console.log(nMoves);
			// check for a winner
			if (checkWinner()) {
				console.log("game over!");
				gameOver = true;
				$("#container").append("<h3 class='buttons start'>NEW GAME</h3>");
				return;
			}

			// computer's turn
			switch (nMoves) {
				// second computer move
				case 2:
					var compCell;
					if (board[1][1] == pieceComp) {		// if computer's first move was in the center
						var possibleMoves = [0, 2, 6, 8];
						compCell = possibleMoves[Math.floor(Math.random()*4)];
						while ( $("#cell"+compCell).html() != "" ) {
							compCell = possibleMoves[Math.floor(Math.random()*4)];
						}
					} else {							// otherwise, it was in a corner
						if (board[0][0] == piecePlayer) {
							var possibleMoves = [2, 6, 8];
							compCell = possibleMoves[Math.floor(Math.random()*3)];
							while ( $("#cell"+compCell).html() != "" ) {
								compCell = possibleMoves[Math.floor(Math.random()*3)];
							}
						} else if (board[0][1] == piecePlayer) {
							compCell = 4;
						} else if (board[0][2] == piecePlayer) {
							var possibleMoves = [0, 6, 8];
							compCell = possibleMoves[Math.floor(Math.random()*3)];
							while ( $("#cell"+compCell).html() != "" ) {
								compCell = possibleMoves[Math.floor(Math.random()*3)];
							}
						} else if (board[1][0] == piecePlayer) {
							compCell = 4;
						} else if (board[1][1] == piecePlayer) {
							var possibleMoves = [0, 2, 6, 8];
							compCell = possibleMoves[Math.floor(Math.random()*4)];
							while ( $("#cell"+compCell).html() != "" ) {
								compCell = possibleMoves[Math.floor(Math.random()*4)];
							}
						} else if (board[1][2] == piecePlayer) {
							compCell = 4;
						} else if (board[2][0] == piecePlayer) {
							var possibleMoves = [0, 2, 8];
							compCell = possibleMoves[Math.floor(Math.random()*3)];
							while ( $("#cell"+compCell).html() != "" ) {
								compCell = possibleMoves[Math.floor(Math.random()*3)];
							}
						} else if (board[2][1] == piecePlayer) {
							compCell = 4;
						} else if (board[2][2] == piecePlayer) {
							var possibleMoves = [0, 2, 6];
							compCell = possibleMoves[Math.floor(Math.random()*3)];
							while ( $("#cell"+compCell).html() != "" ) {
								compCell = possibleMoves[Math.floor(Math.random()*3)];
							}
						}
					}
					break;
				// third computer move
				case 4:
					var compCell = Math.floor(Math.random()*9);
					while ( $("#cell"+compCell).html() != "" ) {
						compCell = Math.floor(Math.random()*9);
					}
				
					/*	
					var compCell;
					var compFirstMove = compMoves[0];
					var compSecondMove = compMoves[1];
					switch (compFirstMove) {
						case 0:
							if (compSecondMove == 2 && board[0][1] == "u") {
								board[0][1] = pieceComp;
							} else if (compSecondMove == 5 && board[2][2] == "u") {
								board[2][2] = pieceComp;
							}
							
							break;
						case 1:
							board[0][1] = pieceComp;
							break;
						case 2:
							board[0][2] = pieceComp;
							break;
						case 3:
							board[1][0] = pieceComp;
							break;
						case 4:
							board[1][1] = pieceComp;
							break;
						case 5:
							board[1][2] = pieceComp;
							break;
						case 6:
							board[2][0] = pieceComp;
							break;
						case 7:
							board[2][1] = pieceComp;
							break;
						case 8:
							board[2][2] = pieceComp;
							break;
						default:
							console.log("error in choice");
					}
					*/
					
					/*
					if (playerMoves.indexOf(2) != -1 || playerMoves.indexOf(4) != -1 || playerMoves.indexOf(6) != -1 || playerMoves.indexOf(8) != -1) {
						var possibleMoves = [0, 2, 6, 8];
						compCell = possibleMoves[Math.floor(Math.random()*4)];
						while ( $("#cell"+compCell).html() != "" ) {
							compCell = possibleMoves[Math.floor(Math.random()*4)];
						}
					} else {
						compCell = Math.floor(Math.random()*9);
						while ( $("#cell"+compCell).html() != "" ) {
							compCell = Math.floor(Math.random()*9);
						}
					}
					*/
					break;
				// fourth computer move
				case 6:
					var compCell = Math.floor(Math.random()*9);
					while ( $("#cell"+compCell).html() != "" ) {
						compCell = Math.floor(Math.random()*9);
					}
					break;
				// fifth computer move, just the last spot on the board
				case 8:
					var compCell = Math.floor(Math.random()*9);
					while ( $("#cell"+compCell).html() != "" ) {
						compCell = Math.floor(Math.random()*9);
					}
					break;
				default:
					console.log("no moves left");
			}

			
			// update the game board backend
			compMoves.push(compCell);
			console.log("Computer moves: " + compMoves);
			switch (compCell) {
				case 0:
					board[0][0] = pieceComp;
					break;
				case 1:
					board[0][1] = pieceComp;
					break;
				case 2:
					board[0][2] = pieceComp;
					break;
				case 3:
					board[1][0] = pieceComp;
					break;
				case 4:
					board[1][1] = pieceComp;
					break;
				case 5:
					board[1][2] = pieceComp;
					break;
				case 6:
					board[2][0] = pieceComp;
					break;
				case 7:
					board[2][1] = pieceComp;
					break;
				case 8:
					board[2][2] = pieceComp;
					break;
				default:
					console.log("error in choice");
			}
			// update the game board front end
			if (pieceComp == "X") {
				$("#cell"+compCell).append("<p class='X'>X</p>");
			} else if (pieceComp == "O") {
				$("#cell"+compCell).append("<p class='O'>O</p>");
			}
			// increment the total number of moves in the game
			nMoves++;
			console.log(board);
			console.log(nMoves);
			// check for a winner
			if (checkWinner() || nMoves == 9) {
				console.log("game over!");
				gameOver = true;
				$("#container").append("<h3 class='buttons start'>NEW GAME</h3>");
				return;
			}
		}
	});

});