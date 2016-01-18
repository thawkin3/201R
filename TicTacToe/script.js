$(document).ready(function(){

	// some global variables I'll need
	var piecePlayer;
	var pieceComp;
	var board;
	var gameOver;
	var nMoves;
	var playerMoves;
	var compMoves;
	var compCell;

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

	// function to check if the computer can win on the next move
	// if so, it will go there
	function compWinMove() {
		// top row
		if (board[0][0] == pieceComp && board[0][1] == pieceComp && board[0][2] == "u") {
			return 2;
		} else if (board[0][0] == pieceComp && board[0][2] == pieceComp && board[0][1] == "u") {
			return 1;
		} else if (board[0][1] == pieceComp && board[0][2] == pieceComp && board[0][0] == "u") {
			return 0;
		// middle row
		} else if (board[1][0] == pieceComp && board[1][1] == pieceComp && board[1][2] == "u") {
			return 5;
		} else if (board[1][0] == pieceComp && board[1][2] == pieceComp && board[1][1] == "u") {
			return 4;
		} else if (board[1][1] == pieceComp && board[1][2] == pieceComp && board[1][0] == "u") {
			return 3;
		// bottom row
		} else if (board[2][0] == pieceComp && board[2][1] == pieceComp && board[2][2] == "u") {
			return 8;
		} else if (board[2][0] == pieceComp && board[2][2] == pieceComp && board[2][1] == "u") {
			return 7;
		} else if (board[2][1] == pieceComp && board[2][2] == pieceComp && board[2][0] == "u") {
			return 6;
		// left column
		} else if (board[0][0] == pieceComp && board[1][0] == pieceComp && board[2][0] == "u") {
			return 6;
		} else if (board[0][0] == pieceComp && board[2][0] == pieceComp && board[1][0] == "u") {
			return 3;
		} else if (board[1][0] == pieceComp && board[2][0] == pieceComp && board[0][0] == "u") {
			return 0;
		// middle column
		} else if (board[0][1] == pieceComp && board[1][1] == pieceComp && board[2][1] == "u") {
			return 7;
		} else if (board[0][1] == pieceComp && board[2][1] == pieceComp && board[1][1] == "u") {
			return 4;
		} else if (board[1][1] == pieceComp && board[2][1] == pieceComp && board[0][1] == "u") {
			return 1;
		// right column
		} else if (board[0][2] == pieceComp && board[1][2] == pieceComp && board[2][2] == "u") {
			return 8;
		} else if (board[0][2] == pieceComp && board[2][2] == pieceComp && board[1][2] == "u") {
			return 5;
		} else if (board[1][2] == pieceComp && board[2][2] == pieceComp && board[0][2] == "u") {
			return 2;
		// top left to bottom right
		} else if (board[0][0] == pieceComp && board[1][1] == pieceComp && board[2][2] == "u") {
			return 8;
		} else if (board[0][0] == pieceComp && board[2][2] == pieceComp && board[1][1] == "u") {
			return 4;
		} else if (board[1][1] == pieceComp && board[2][2] == pieceComp && board[0][0] == "u") {
			return 0;
		// top right to bottom left
		} else if (board[0][2] == pieceComp && board[1][1] == pieceComp && board[2][0] == "u") {
			return 6;
		} else if (board[0][2] == pieceComp && board[2][0] == pieceComp && board[1][1] == "u") {
			return 4;
		} else if (board[1][1] == pieceComp && board[2][0] == pieceComp && board[0][2] == "u") {
			return 2;
		} else {
			return null;
		}
	}

	// function to check if the player is about to win on the next move
	// if so, the computer will block the player
	function blockPlayerWinMove() {
		// top row
		if (board[0][0] == piecePlayer && board[0][1] == piecePlayer && board[0][2] == "u") {
			return 2;
		} else if (board[0][0] == piecePlayer && board[0][2] == piecePlayer && board[0][1] == "u") {
			return 1;
		} else if (board[0][1] == piecePlayer && board[0][2] == piecePlayer && board[0][0] == "u") {
			return 0;
		// middle row
		} else if (board[1][0] == piecePlayer && board[1][1] == piecePlayer && board[1][2] == "u") {
			return 5;
		} else if (board[1][0] == piecePlayer && board[1][2] == piecePlayer && board[1][1] == "u") {
			return 4;
		} else if (board[1][1] == piecePlayer && board[1][2] == piecePlayer && board[1][0] == "u") {
			return 3;
		// bottom row
		} else if (board[2][0] == piecePlayer && board[2][1] == piecePlayer && board[2][2] == "u") {
			return 8;
		} else if (board[2][0] == piecePlayer && board[2][2] == piecePlayer && board[2][1] == "u") {
			return 7;
		} else if (board[2][1] == piecePlayer && board[2][2] == piecePlayer && board[2][0] == "u") {
			return 6;
		// left column
		} else if (board[0][0] == piecePlayer && board[1][0] == piecePlayer && board[2][0] == "u") {
			return 6;
		} else if (board[0][0] == piecePlayer && board[2][0] == piecePlayer && board[1][0] == "u") {
			return 3;
		} else if (board[1][0] == piecePlayer && board[2][0] == piecePlayer && board[0][0] == "u") {
			return 0;
		// middle column
		} else if (board[0][1] == piecePlayer && board[1][1] == piecePlayer && board[2][1] == "u") {
			return 7;
		} else if (board[0][1] == piecePlayer && board[2][1] == piecePlayer && board[1][1] == "u") {
			return 4;
		} else if (board[1][1] == piecePlayer && board[2][1] == piecePlayer && board[0][1] == "u") {
			return 1;
		// right column
		} else if (board[0][2] == piecePlayer && board[1][2] == piecePlayer && board[2][2] == "u") {
			return 8;
		} else if (board[0][2] == piecePlayer && board[2][2] == piecePlayer && board[1][2] == "u") {
			return 5;
		} else if (board[1][2] == piecePlayer && board[2][2] == piecePlayer && board[0][2] == "u") {
			return 2;
		// top left to bottom right
		} else if (board[0][0] == piecePlayer && board[1][1] == piecePlayer && board[2][2] == "u") {
			return 8;
		} else if (board[0][0] == piecePlayer && board[2][2] == piecePlayer && board[1][1] == "u") {
			return 4;
		} else if (board[1][1] == piecePlayer && board[2][2] == piecePlayer && board[0][0] == "u") {
			return 0;
		// top right to bottom left
		} else if (board[0][2] == piecePlayer && board[1][1] == piecePlayer && board[2][0] == "u") {
			return 6;
		} else if (board[0][2] == piecePlayer && board[2][0] == piecePlayer && board[1][1] == "u") {
			return 4;
		} else if (board[1][1] == piecePlayer && board[2][0] == piecePlayer && board[0][2] == "u") {
			return 2;
		} else {
			return null;
		}
	}

	// set computer up for a move with two options to win if possible
	function setUpWin() {
		if (board[0][0] == "u" && board[0][1] == "u" && board[1][0] == "u") {
			return 0;
		} else if (board[0][2] == "u" && board[0][1] == "u" && board[1][2] == "u") {
			return 2;
		} else if (board[2][0] == "u" && board[1][0] == "u" && board[2][1] == "u") {
			return 6;
		} else if (board[2][2] == "u" && board[1][2] == "u" && board[2][1] == "u") {
			return 8;
		} else {
			return null;
		}
	}

	// last computer's move, pick the last remaining spot
	function lastSpot() {
		if (board[0][0] == "u") {
			return 0;
		} else if (board[0][1] == "u") {
			return 1;
		} else if (board[0][2] == "u") {
			return 2;
		} else if (board[1][0] == "u") {
			return 3;
		} else if (board[1][1] == "u") {
			return 4;
		} else if (board[1][2] == "u") {
			return 5;
		} else if (board[2][0] == "u") {
			return 6;
		} else if (board[2][1] == "u") {
			return 7;
		} else if (board[2][2] == "u") {
			return 8;
		} else {
			return "error";
		}
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
		compCell = possibleMoves[Math.floor(Math.random()*5)];
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
			compCell = null;
			switch (nMoves) {
				// second computer move
				case 2:
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
					compCell = compWinMove();
					console.log("nMoves = 4, comp can win: " + compCell);
					if (compCell == null) {
						compCell = blockPlayerWinMove();
						console.log("nMoves = 4, player can win: " + compCell);
						if (compCell == null) {
							compCell = setUpWin();
							if (compCell == null) {
								var possibleMoves = [0, 2, 6, 8];
								compCell = possibleMoves[Math.floor(Math.random()*4)];
								while ( $("#cell"+compCell).html() != "" ) {
									compCell = possibleMoves[Math.floor(Math.random()*4)];
								}
							}
						}
					}
					break;
				// fourth computer move
				case 6:
					compCell = compWinMove();
					console.log("nMoves = 6, comp can win: " + compCell);
					if (compCell == null) {
						compCell = blockPlayerWinMove();
						console.log("nMoves = 6, player can win: " + compCell);
						if (compCell == null) {
							compCell = setUpWin();
							if (compCell == null) {
								var possibleMoves = [0, 2, 6, 8];
								compCell = possibleMoves[Math.floor(Math.random()*4)];
								while ( $("#cell"+compCell).html() != "" ) {
									compCell = possibleMoves[Math.floor(Math.random()*4)];
								}
							}
						}
					}
					break;
				// fifth computer move, just the last spot on the board
				case 8:
					compCell = lastSpot();
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