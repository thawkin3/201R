/**************************************************
** GAME VARIABLES
**************************************************/
var canvas,			// Canvas DOM element
	ctx,			// Canvas rendering context
	keys,			// Keyboard input
	localPlayer,	// Local player
	remotePlayers,	// Remote players
	socket;			// Socket connection

var colors = ['green', 'blue', 'yellow', 'pink', 'orange', 'purple', 'coral', 'darkkhaki', 'gold', 'palevioletred'];

var localFood;
var remoteFoods;
var localBall;
var remoteBalls;
var allBalls;
var allFoods;
var allPlayers;
var invincible = false;

var gameEnd = false;								// If this is true, the game is over
var startTime = new Date().getTime();				// Time player joined the game
var endTime;										// Will be time when player lost the game
var timeDiff;										// Will be endTime minus startTime
var username = $.cookie('username') || 'GUEST';		// To send to the people you eat

$(document).ready(function(){
	
	// Updates the message at the bottom of your screen with who you are
	$('#msgReplace').html('<h3 class="message">' + username + '</h3>');

	// If you quit the game, mark that you've exited
	$('#quit').click(function(){
		gameEnd = true;
	});

});

/**************************************************
** GAME INITIALIZATION
**************************************************/
function init() {
	// Declare the canvas and rendering context
	canvas = document.getElementById('gameCanvas');
	ctx = canvas.getContext('2d');

	// Maximize the canvas
	//canvas.width = window.innerWidth;
	//canvas.height = window.innerHeight;
	
	// Set the canvas width
	canvas.width = 1000;
	canvas.height = 500;

	// Initialize keyboard controls
	keys = new Keys();

	// Calculate a random start position for the local player
	// and make sure it's not outside of the canvas bounds
	var startX = Math.floor( Math.random() * (canvas.width - 20) + 5 );
	var startY = Math.floor( Math.random() * (canvas.height - 20) + 5 );

	// Create a start size and color
	var startSize = 10;
	var startColor = colors[Math.floor( Math.random() * colors.length )];
	document.getElementById('yourColor').style.background = startColor;

	// Initialize the local player
	localPlayer = new Player(startX, startY, startSize, startColor);

	// Create the red ball
	var ballX = Math.floor( Math.random() * (canvas.width - 40) + 5 );
	var ballY = Math.floor( Math.random() * (canvas.height - 40) + 5 );

	// Initialize the local ball
	localBall = new Ball(ballX, ballY);

	// Initialize socket connection
	socket = io.connect('http://54.200.192.157', {port: 3005, transports: ['websocket']}); // TYLER'S SOCKET
	// socket = io.connect('http://52.34.95.112', {port: 3005, transports: ['websocket']}); //MATT'S SOCKET
	// socket = io.connect('http://localhost', {port: 3005, transports: ['websocket']});

	// Initialize remote players array
	remotePlayers = [];

	// Initialize the remote balls array
	remoteBalls = [];

	// Initialize the remote foods array
	allFoods = [];

	// Start listening for events
	setEventHandlers();
};


/**************************************************
** GAME EVENT HANDLERS
**************************************************/
var setEventHandlers = function() {

	// Keyboard
	window.addEventListener('keydown', onKeydown, false);
	window.addEventListener('keyup', onKeyup, false);

	/*
	// Window resize
	window.addEventListener('resize', onResize, false);
	*/

	// Socket connection successful
	socket.on('connect', onSocketConnected);

	// Socket disconnection
	socket.on('disconnect', onSocketDisconnect);

	// New player message received
	socket.on('new player', onNewPlayer);

	// Player move message received
	socket.on('move player', onMovePlayer);

	// Player removed message received
	socket.on('remove player', onRemovePlayer);

	// New ball message received
	socket.on('new ball', onNewBall);

	// Ball move message received
	socket.on('move ball', onMoveBall);

	// Ball removed message received
	socket.on('remove ball', onRemoveBall);

	// New food message received
	socket.on('new food', onNewFood);

	// Food removed message received
	socket.on('remove food', onRemoveFood);

};

// Keyboard key down
function onKeydown(e) {
	if (localPlayer) {
		keys.onKeyDown(e);
	};
};

// Keyboard key up
function onKeyup(e) {
	if (localPlayer) {
		keys.onKeyUp(e);
	};
};

/*
// Browser window resize
function onResize(e) {
	// Maximise the canvas
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
};
*/

// Socket connected
function onSocketConnected() {
	console.log('Connected to socket server');

	// Send local player data to the game server
	socket.emit('new player', { x: localPlayer.getX(), y: localPlayer.getY(), size: localPlayer.getSize(), color: localPlayer.getColor() });

	// Send local ball data to the game server
	socket.emit('new ball', { x: localBall.getX(), y: localBall.getY(), dx: localBall.getDX(), dy: localBall.getDY(), color: localBall.getColor() });

};

// Socket disconnected
function onSocketDisconnect() {
	console.log('Disconnected from socket server');
};

// New player
function onNewPlayer(data) {
	console.log('New player connected: ' + data.id);

	// Initialize the new player
	var newPlayer = new Player(data.x, data.y, data.size, data.color);	// TESTING!
	newPlayer.id = data.id;

	// Add new player to the remote players array
	remotePlayers.push(newPlayer);

	// Remove the color from the colors array
	colors.splice(colors.indexOf(data.color), 1);
};

// Move player
function onMovePlayer(data) {
	var movePlayer = playerById(data.id);

	// Player not found
	if (!movePlayer) {
		console.log('Player not found: ' + data.id);
		return;
	};

	// Update player position
	movePlayer.setX(data.x);
	movePlayer.setY(data.y);
	movePlayer.setSize(data.size);	// Updates the size that is shown to the other players
};

// Remove player
function onRemovePlayer(data) {
	var removePlayer = playerById(data.id);
	
	// Player not found, must be you
	if (!removePlayer) {
		// Write at the bottom of your screen that you've died
		// It must be you, since we don't have local IDs
		document.getElementById('messageBoard').innerHTML = '<h3 class="message">You have been eaten by: ' + data.username + '</h3>';
		gameEnd = true;
		return;
	};
	
	// Add the color back into the array of possible colors
	colors.push(data.color);

	// Remove player from array
	remotePlayers.splice(remotePlayers.indexOf(removePlayer), 1);

};

// New ball
function onNewBall(data) {
	console.log('New ball connected: ' + data.id);

	// Initialize the new ball
	var newBall = new Ball(data.x, data.y, data.dx, data.dy);
	newBall.id = data.id;

	// Add new ball to the remote balls array
	remoteBalls.push(newBall);
};

// Move ball
function onMoveBall(data) {
	var moveBall = ballById(data.id);

	// Update ball position
	moveBall.setX(data.x);
	moveBall.setY(data.y);
	moveBall.setDX(data.dx);
	moveBall.setDY(data.dy);
};

// Remove ball
function onRemoveBall(data) {
	var removeBall = ballById(data.id);

	// Remove ball from array
	remoteBalls.splice(remoteBalls.indexOf(removeBall), 1);

};

// New food
function onNewFood(data) {

	// Initialize the new food
	var newFood = new Food(data.x, data.y, data.number);

	// Add new player to the remote foods array
	allFoods.push(newFood);
};

// Remove food
function onRemoveFood(data) {
	var removeFood = foodById(data.number);

	// Food not found
	if (!removeFood) {
		console.log('Food not found: ' + data.number);
		return;
	};

	// Remove food from array
	allFoods.splice(allFoods.indexOf(removeFood), 1);

};


/**************************************************
** GAME ANIMATION LOOP
**************************************************/
function animate() {
	// IF the game hasn't ended yet, run this recursive loop
	if (!gameEnd) {

		update();
		draw();

		// Request a new animation frame using Paul Irish's shim
		window.requestAnimFrame(animate);

	// But if it has ended, submit the score and go to the high scores page
	} else {
		endTime = new Date().getTime();
		timeDiff = (endTime - startTime) / 1000;
		var score = Math.round(timeDiff * Number(localPlayer.getSize()));
		var scoreObj = { Username: username, Score: score };
        var jsonScoreObj = JSON.stringify(scoreObj);
		var scoreUrl = 'addscore';
		$.ajax({
  			url: scoreUrl,
  			type: 'POST',
  			data: jsonScoreObj,
  			contentType: 'application/json; charset=utf-8',
  			success: function(data,textStatus) {
      			console.log('done');
  			}
		})
		.fail(function(){
			console.log('failed...');
		});

		// go to the highscores view
		setTimeout(function(){
			window.location.pathname = '/highscores';
		}, 1000);
	}
};


/**************************************************
** GAME UPDATE
**************************************************/
function update() {
	// Update local player and check for change
	if (localPlayer.update(keys)) {
		// Send local player data to the game server
		socket.emit('move player', { x: localPlayer.getX(), y: localPlayer.getY(), size: localPlayer.getSize(), color: localPlayer.getColor() });
	}

	// Send local ball data to the game server
	if (localBall.update()) {
		socket.emit('move ball', { x: localBall.getX(), y: localBall.getY(), dx: localBall.getDX(), dy: localBall.getDY(), color: localBall.getColor() });
	}

	// Get player positions for functions below
	var playerX = localPlayer.getX();
	var playerY = localPlayer.getY();
	var playerSize = localPlayer.getSize();

	// Update player size when hit by a ball
	if (allBalls && allBalls.length) {
		var strikingDistance = (playerSize / 2) + 5; //5 is the ball size
		for (var i = 0; i < allBalls.length; i++) {
			
			// Get player and ball positions
			var ballX = allBalls[i].getX();
			var ballY = allBalls[i].getY();
			var x = Math.abs(playerX-ballX);
			var y = Math.abs(playerY-ballY);
			
			// Use pythagorean thm to find the distance between player and ball
			var hypot = Math.sqrt(( x * x ) + ( y * y ));
			
			// Check to see if they have collided
			if (hypot <= strikingDistance && !invincible) {
				
				// Cut your size in half
				localPlayer.setSize(playerSize/2);
				
				// Send a message to the server that your size has changed
				socket.emit('move player', { x: localPlayer.getX(), y: localPlayer.getY(), size: localPlayer.getSize(), color: localPlayer.getColor() });
				
				// Make yourself temporarily invincible from being immediately hit by another ball
				invincible = true;
				setTimeout(function() {
					invincible = false;
				}, 1500);
			}
		}
	}

	// Eating another player
	if (remotePlayers && remotePlayers.length) {
		for (var i = 0; i < remotePlayers.length; i++) {
			
			// Get player positions and sizes
			var otherPlayerX = remotePlayers[i].getX();
			var otherPlayerY = remotePlayers[i].getY();
			var otherPlayerSize = remotePlayers[i].getSize();
			var x = Math.abs(playerX-otherPlayerX);
			var y = Math.abs(playerY-otherPlayerY);
			var strikingDistance = 10;
			
			// Use pythagorean theorem to find the distance between players
			var hypot = Math.sqrt(( x * x ) + ( y * y ));
			
			// Check to see if they have overlapped
			if (playerSize > otherPlayerSize && hypot + otherPlayerSize/4 < playerSize/2) {
				localPlayer.setSize(otherPlayerSize/4 + playerSize);
				
				// Put a limit on how big a player can get
				if (localPlayer.getSize() >= 300) {
					localPlayer.setSize(300);
				}
				
				// Send a message to the server that you've grown
				socket.emit('move player', { x: localPlayer.getX(), y: localPlayer.getY(), size: localPlayer.getSize(), color: localPlayer.getColor() });
				
				// Send a message to the server that the other player has been eaten, and remove that player from the array
				socket.emit('remove player', {id: remotePlayers[i].id, username: username });
				remotePlayers.splice(i, 1);
			}
		}
	}

	// Eating food and growing
	if (allFoods && allFoods.length) {
		var strikingDistance = (playerSize / 2) + 2.5; // 2.5 is the food size
		for (var i = 0; i < allFoods.length; i++) {
			
			// Get food and player positions
			var foodX = allFoods[i].getX();
			var foodY = allFoods[i].getY();
			var x = Math.abs(playerX-foodX);
			var y = Math.abs(playerY-foodY);
			
			// Use pythagorean theorem to find the distance between player and food
			var hypot = Math.sqrt(( x * x ) + ( y * y ));
			
			// Check to see if they have collided
			if (hypot <= strikingDistance) {
					localPlayer.setSize(2 + playerSize);
					
					// Put a limit on how big a player can get
					if (localPlayer.getSize() >= 300) {
						localPlayer.setSize(300);
					}

					// Send a message to the server to update the size of the player
					socket.emit('move player', { x: localPlayer.getX(), y: localPlayer.getY(), size: localPlayer.getSize(), color: localPlayer.getColor() });
					
					// Send a message to the server to remove the food from other screens
					socket.emit('remove food', { number: allFoods[i].number });
					allFoods.splice(i, 1);
			}
		}
	}

};


/**************************************************
** GAME DRAW
**************************************************/
function draw() {
	// Wipe the canvas clean
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Draw some food
	for (var i = 0; i < allFoods.length; i++) {
		allFoods[i].draw(ctx);
	}
	// Put the local and the remote players together
	allPlayers = remotePlayers.concat(localPlayer);

	// Sort order of all players by size
	allPlayers = allPlayers.sort(sortPlayers);

	// Draw all the players
	for (var i = 0; i < allPlayers.length; i++) {
		allPlayers[i].draw(ctx);
	};

	// Put the local and the remote balls together
	allBalls = remoteBalls.concat(localBall);

	// Draw all the balls
	for (var i = 0; i < allBalls.length; i++) {
		allBalls[i].draw(ctx);
	};
};


/**************************************************
** GAME HELPER FUNCTIONS
**************************************************/
// Find player by ID
function playerById(id) {
	for (var i = 0; i < remotePlayers.length; i++) {
		if (remotePlayers[i].id == id)
			return remotePlayers[i];
	};

	return false;
};


// Find ball by ID
function ballById(id) {
	for (var i = 0; i < remoteBalls.length; i++) {
		if (remoteBalls[i].id == id)
			return remoteBalls[i];
	};

	return false;
};

// Find food by ID
function foodById(number) {
	for (var i = 0; i < allFoods.length; i++) {
		if (allFoods[i].number == number)
			return allFoods[i];
	};

	return false;
};


// Sort order of players by size
function sortPlayers(a, b) {
	return a.getSize() - b.getSize();
}
