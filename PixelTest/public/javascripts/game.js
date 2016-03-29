/**************************************************
** GAME VARIABLES
**************************************************/
var canvas,			// Canvas DOM element
	ctx,			// Canvas rendering context
	keys,			// Keyboard input
	localPlayer,	// Local player
	remotePlayers,	// Remote players
	socket;			// Socket connection

var colors = ["green", "blue", "yellow", "pink", "limegreen", "orange", "purple", "coral", "darkkhaki", "gold", "palevioletred"];

var localFood;
var remoteFoods;
var localBall;
var remoteBalls;

/**************************************************
** GAME INITIALIZATION
**************************************************/
function init() {
	// Declare the canvas and rendering context
	canvas = document.getElementById("gameCanvas");
	ctx = canvas.getContext("2d");

	// Maximize the canvas
	//canvas.width = window.innerWidth;
	//canvas.height = window.innerHeight;
	canvas.width = 700;
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

	// Initialize the local player
	localPlayer = new Player(startX, startY, startSize, startColor);

	// Create the red ball
	var ballX = Math.floor( Math.random() * (canvas.width - 20) + 5 );
	var ballY = Math.floor( Math.random() * (canvas.height - 20) + 5 );

	// Initialize the local ball
	localBall = new Ball(ballX, ballY);

	// TESTING!
	// Generate some food, but don't draw it until later
	// for (var i = 0; i < 10; i++) {
		var foodX = Math.floor( Math.random() * (canvas.width - 20) + 5 );
		var foodY = Math.floor( Math.random() * (canvas.height - 20) + 5 );
		// foods.push({ "foodX": foodX, "foodY": foodY });
	// }

	// Initialize the local food
	localFood = new Food(foodX, foodY);

	// Initialize socket connection
	socket = io.connect("http://54.200.192.157", {port: 3005, transports: ["websocket"]});

	// Initialize remote players array
	remotePlayers = [];

	// Initialize the remote balls array
	remoteBalls = [];

	// Initialize the remote foods array
	remoteFoods = [];

	// Start listening for events
	setEventHandlers();
};


/**************************************************
** GAME EVENT HANDLERS
**************************************************/
var setEventHandlers = function() {
	
	// Keyboard
	window.addEventListener("keydown", onKeydown, false);
	window.addEventListener("keyup", onKeyup, false);

	/*
	// Window resize
	window.addEventListener("resize", onResize, false);
	*/

	// Socket connection successful
	socket.on("connect", onSocketConnected);

	// Socket disconnection
	socket.on("disconnect", onSocketDisconnect);

	// New player message received
	socket.on("new player", onNewPlayer);

	// Player move message received
	socket.on("move player", onMovePlayer);

	// Player removed message received
	socket.on("remove player", onRemovePlayer);

	// New ball message received
	socket.on("new ball", onNewBall);

	// Ball move message received
	socket.on("move ball", onMoveBall);

	// Ball removed message received
	socket.on("remove ball", onRemoveBall);

	// New food message received
	socket.on("new food", onNewFood);

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
	console.log("Connected to socket server");

	// Send local player data to the game server
	socket.emit("new player", { x: localPlayer.getX(), y: localPlayer.getY(), size: localPlayer.getSize(), color: localPlayer.getColor() });

	// Send local ball data to the game server
	socket.emit("new ball", { x: localBall.getX(), y: localBall.getY(), dx: localBall.getDX(), dy: localBall.getDY(), color: localBall.getColor() });

	setInterval(function() {
	// Send local food data to the game server
		socket.emit("new food", { x: localFood.getX(), y: localFood.getY(), color: localFood.getColor() });
		foodX = Math.floor( Math.random() * (canvas.width - 20) + 5 );
		foodY = Math.floor( Math.random() * (canvas.height - 20) + 5 );
		localFood = new Food(foodX, foodY);
		remoteFoods.push(newFood);
	}, 5000);

};

// Socket disconnected
function onSocketDisconnect() {
	console.log("Disconnected from socket server");
};

// New player
function onNewPlayer(data) {
	console.log("New player connected: " + data.id);

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
		console.log("Player not found: " + data.id);
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

	// Player not found
	if (!removePlayer) {
		console.log("Player not found: " + data.id);
		return;
	};

	// Add the color back into the array of possible colors
	colors.push(data.color);

	// Remove player from array
	remotePlayers.splice(remotePlayers.indexOf(removePlayer), 1);

};


// New ball
function onNewBall(data) {
	console.log("New ball connected: " + data.id);

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
	console.log("New food connected: " + data.id);

	// Initialize the new food
	var newFood = new Food(data.x, data.y);
	newFood.id = data.id;

	// Add new player to the remote foods array
	remoteFoods.push(newFood);
};



/**************************************************
** GAME ANIMATION LOOP
**************************************************/
function animate() {
	update();
	draw();

	// Request a new animation frame using Paul Irish's shim
	window.requestAnimFrame(animate);
};


/**************************************************
** GAME UPDATE
**************************************************/
function update() {
	// Update local player and check for change
	if (localPlayer.update(keys)) {
		// Send local player data to the game server
		socket.emit("move player", { x: localPlayer.getX(), y: localPlayer.getY(), size: localPlayer.getSize(), color: localPlayer.getColor() });
	};
	// TESTING!
	// THIS IS THE SPOT THAT GIVES ERRORS WHEN IT'S UNCOMMENTED!
	// ERROR IN THE TERMINAL SHOWS THAT THE BALLS ARRAY IS EMPTY AND THAT MOVEBALL IS FALSE
	// FIX THAT AND YOU SHOULD BE GOOD
	// need to emit an event here that the ball is moving. maybe?
	// this if statement is always true
	if (localBall.update()) {
		socket.emit("move ball", { x: localBall.getX(), y: localBall.getY(), dx: localBall.getDX(), dy: localBall.getDY(), color: localBall.getColor() });
	}
};


/**************************************************
** GAME DRAW
**************************************************/
function draw() {
	// Wipe the canvas clean
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Put the local and the remote players together
	var allPlayers = remotePlayers.concat(localPlayer);

	// Sort order of all players by size
	allPlayers = allPlayers.sort(sortPlayers);

	// Draw all the players
	for (var i = 0; i < allPlayers.length; i++) {
		allPlayers[i].draw(ctx);
	};

	// Put the local and the remote balls together
	var allBalls = remoteBalls.concat(localBall);

	// Draw all the balls
	for (var i = 0; i < allBalls.length; i++) {
		allBalls[i].draw(ctx);
	};

	// Put the local and the remote foods together
	var allFoods = remoteFoods.concat(localFood);

	// Draw some food
	for (var i = 0; i < allFoods.length; i++) {
		allFoods[i].draw(ctx);
	}
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
function foodById(id) {
	for (var i = 0; i < remoteFoods.length; i++) {
		if (remoteFoods[i].id == id)
			return remoteFoods[i];
	};
	
	return false;
};


// Sort order of players by size
function sortPlayers(a, b) {
	return a.getSize() - b.getSize();
}
