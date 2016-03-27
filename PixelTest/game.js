/**************************************************
** NODE.JS REQUIREMENTS
**************************************************/
var util = require("util");					// Utility resources (logging, object inspection, etc)
var io = require("socket.io");				// Socket.IO
var Player = require("./Player").Player;	// Player class
var Ball = require("./Ball").Ball;			// Ball class


/**************************************************
** GAME VARIABLES
**************************************************/
var socket;		// Socket controller
var players;	// Array of connected players
var balls;		// Array of connected balls

// Array of colors for players
var colors = ["green", "blue", "yellow", "pink", "limegreen", "orange", "purple", "coral", "darkkhaki", "gold", "palevioletred"];


/**************************************************
** GAME INITIALIZATION
**************************************************/
function init() {
	// Create an empty array to store players
	players = [];

	// Create an empty array to store balls
	balls = [];

	// TESTING!
	// Create the red ball
	// var ballX = Math.floor( Math.random() * (canvas.width - 20) + 5 );
	// var ballY = Math.floor( Math.random() * (canvas.height - 20) + 5 );
	// ball = new Ball(ballX, ballY);

	// Set up Socket.IO to listen on port 8000
	socket = io.listen(3005);

	// Configure Socket.IO
	socket.configure(function() {
		// Only use WebSockets
		socket.set("transports", ["websocket"]);

		// Restrict log output
		socket.set("log level", 2);
	});

	// Start listening for events
	setEventHandlers();
};


/**************************************************
** GAME EVENT HANDLERS
**************************************************/
var setEventHandlers = function() {
	// Socket.IO
	socket.sockets.on("connection", onSocketConnection);
};

// New socket connection
function onSocketConnection(client) {
	util.log("New player has connected: " + client.id);

	// Listen for client disconnected
	client.on("disconnect", onClientDisconnect);

	// Listen for new player message
	client.on("new player", onNewPlayer);

	// Listen for move player message
	client.on("move player", onMovePlayer);

	// Listen for new ball message
	// client.on("new ball", onNewBall);

	// Listen for move ball message
	// client.on("move ball", onMoveBall);
};

// Socket client has disconnected
function onClientDisconnect() {
	util.log("Player has disconnected: " + this.id);

	var removePlayer = playerById(this.id);

	// Player not found
	if (!removePlayer) {
		util.log("Player not found: " + this.id);
		return;
	};

	// Add the color back into the array of possible colors
	colors.push(this.color);

	// Remove player from players array
	players.splice(players.indexOf(removePlayer), 1);

	// Broadcast removed player to connected socket clients
	this.broadcast.emit("remove player", {id: this.id});

	// Broadcast removed player to connected socket clients
	// this.broadcast.emit("remove ball", {id: this.id});
};

// New player has joined
function onNewPlayer(data) {

	console.log("inside the onNewPlayer function in the game.js server script");

	// Create a new player
	var newPlayer = new Player(data.x, data.y, data.size, data.color);	// TESTING!
	newPlayer.id = this.id;
	console.log("player data: " + data);
	console.log("player id: " + this.id);

	// Broadcast new player to connected socket clients
	this.broadcast.emit("new player", { id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY(), size: newPlayer.getSize(), color: newPlayer.getColor() });

	// Send existing players to the new player
	var i, existingPlayer;
	for (i = 0; i < players.length; i++) {
		existingPlayer = players[i];
		this.emit("new player", { id: existingPlayer.id, x: existingPlayer.getX(), y: existingPlayer.getY(), size: existingPlayer.getSize(), color: existingPlayer.getColor() });
	};
		
	// Add new player to the players array
	players.push(newPlayer);

	// Remove the color from the colors array
	colors.splice(colors.indexOf(data.color), 1);
};

// Player has moved
function onMovePlayer(data) {
	// Find player in array
	var movePlayer = playerById(this.id);

	// Player not found
	if (!movePlayer) {
		util.log("Player not found: " + this.id);
		return;
	};

	// Update player position
	movePlayer.setX(data.x);
	movePlayer.setY(data.y);
	movePlayer.setSize(data.size);	// Updates the size that is shown to the other players

	// Broadcast updated position to connected socket clients
	this.broadcast.emit("move player", { id: movePlayer.id, x: movePlayer.getX(), y: movePlayer.getY(), size: movePlayer.getSize(), color: movePlayer.getColor() });
};


// New ball has joined
function onNewBall(data) {
	// Create a new ball
	var newBall = new Ball(data.x, data.y);	// TESTING!
	newBall.id = this.id;

	console.log("inside OnNewBall in game.js server script");

	// Broadcast new ball to connected socket clients
	this.broadcast.emit("new ball", { id: newBall.id, x: newBall.getX(), y: newBall.getY(), dx: newBall.getDX(), dy: newBall.getDY() });

	// Send existing balls to the new ball
	var i, existingBall;
	for (i = 0; i < balls.length; i++) {
		existingBall = balls[i];
		this.emit("new ball", { id: existingBall.id, x: existingBall.getX(), y: existingBall.getY(), dx: existingBall.getDX(), dy: existingBall.getDY() });
	};

	// TEST
	console.log("new Ball:" + newBall);
		
	// Add new ball to the balls array
	balls.push(newBall);

	// TEST
	console.log(balls);
};

// Ball has moved
function onMoveBall(data) {
	// Find ball in array
	console.log(this.id);
	var moveBall = ballById(this.id);
	console.log("ball data: " + JSON.stringify(data));
	console.log("moveBall: " + JSON.stringify(moveBall));

	// Update ball position
	moveBall.setX(data.x);
	moveBall.setY(data.y);
	moveBall.setDX(data.dx);	// Updates the speed that is shown to the other players
	moveBall.setDY(data.dy);	// Updates the speed that is shown to the other players

	// Broadcast updated position to connected socket clients
	this.broadcast.emit("move ball", { id: moveBall.id, x: moveBall.getX(), y: moveBall.getY(), dx: moveBall.getDX(), dy: moveBall.getDY() });
};



/**************************************************
** GAME HELPER FUNCTIONS
**************************************************/
// Find player by ID
function playerById(id) {
	for (var i = 0; i < players.length; i++) {
		if (players[i].id == id)
			return players[i];
	};
	
	return false;
};


// Find ball by ID
function ballById(id) {
	console.log(balls);
	console.log(balls.length);
	for (var i = 0; i < balls.length; i++) {
		if (balls[i].id == id)
			return balls[i];
	};
	
	return false;
};



/**************************************************
** RUN THE GAME
**************************************************/
init();

exports.gameInit = init;
