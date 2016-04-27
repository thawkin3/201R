/**************************************************
** NODE.JS REQUIREMENTS
**************************************************/
var util = require("util");					// Utility resources (logging, object inspection, etc)
var io = require("socket.io");				// Socket.IO
var Player = require("./Player").Player;	// Player class
var Ball = require("./Ball").Ball;			// Ball class
var Food = require("./Food").Food;			// Food class

// NEW COMMENT

/**************************************************
** GAME VARIABLES
**************************************************/
var socket;		// Socket controller
var players;	// Array of connected players
var balls;		// Array of connected balls
var foods;		// Array of food
var numUsers;	// Gets current count of users in the game
var interval;	// Used as the interval count to create food
var foodCreator; // the interval that creates new foods
// Array of colors for players
var colors = ["green", "blue", "yellow", "pink", "limegreen", "orange", "purple", "coral", "darkkhaki", "gold", "palevioletred"];


/**************************************************
** GAME INITIALIZATION
**************************************************/
function init() {
	that = this;

	// Create an empty array to store players
	players = [];

	// Create an empty array to store balls
	balls = [];

	// Create an empty array to store the food
	foods = [];
	number = 1;

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

	//init for timer
	numUsers = 1;
	interval = 5000 / numUsers;

	// Start creating food
	var pushFood = function(){
		// check if there are more users, if so change interval
		if (foods.length <= 20) {
			foodX = Math.floor( Math.random() * (1000 - 20) + 5 );
			foodY = Math.floor( Math.random() * (500 - 20) + 5 );
			// Initialize the server food
			food = new Food(foodX, foodY, number);
			//increment the number variable to avoid duplicates
			number++;
			foods.push(food);
			socket.sockets.emit("new food", { x: food.getX(), y: food.getY(), color: food.getColor(), number: food.number });
		}
		addFood(); //call this function over and over
	}
	//Function to loop through to dynamically update interval time
	var addFood = function(){
		interval = 5000 / numUsers;
		setTimeout(pushFood, interval);
	}
	// Initialize and call the pushFood function
	setTimeout(pushFood, interval);

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
	client.on("new ball", onNewBall);

	// Listen for move ball message
	client.on("move ball", onMoveBall);

	// Listen for remove food message
	client.on("remove food", onRemoveFood);

	// Listen for remove player message
	client.on("remove player", onRemovePlayer);
};

// Socket client has disconnected
function onClientDisconnect() {
	util.log("Player has disconnected: " + this.id);

	var removePlayer = playerById(this.id);

	// Player not found
	if (!removePlayer) {
		util.log("Player not found: " + this.id);
		// return;
	} else {
		// Add the color back into the array of possible colors
		colors.push(this.color);

		// Remove player from players array
		players.splice(players.indexOf(removePlayer), 1);

		// Broadcast removed player to connected socket clients
		this.broadcast.emit("remove player", {id: this.id});

	};

	var removeBall = ballById(this.id);

	// Player not found
	if (!removeBall) {
		util.log("Ball not found: " + this.id);
		// return;
	} else {
		// Remove player from players array
		balls.splice(balls.indexOf(removeBall), 1);

		// Broadcast removed player to connected socket clients
		this.broadcast.emit("remove ball", {id: this.id});
	};

	// Tell the food creator that there is one less person in the game
	numUsers--;
};

// New player has joined
function onNewPlayer(data) {


	// Create a new player
	var newPlayer = new Player(data.x, data.y, data.size, data.color);	// TESTING!
	newPlayer.id = this.id;

	// Broadcast new player to connected socket clients
	this.broadcast.emit("new player", { id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY(), size: newPlayer.getSize(), color: newPlayer.getColor() });

	// Send existing players to the new player
	var i, existingPlayer;
	for (i = 0; i < players.length; i++) {
		existingPlayer = players[i];
		this.emit("new player", { id: existingPlayer.id, x: existingPlayer.getX(), y: existingPlayer.getY(), size: existingPlayer.getSize(), color: existingPlayer.getColor() });
	};

	// Send existing food to the new player
	var existingFood;
	for (var i = 0; i < foods.length; i++) {
		existingFood = foods[i];
		this.emit("new food", { x: existingFood.getX(), y: existingFood.getY(), number: existingFood.number });
	};

	// Add new player to the players array
	players.push(newPlayer);

	// Remove the color from the colors array
	colors.splice(colors.indexOf(data.color), 1);

	// Tell the food creator that there is another person in the game
	numUsers++;
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


	// Broadcast new ball to connected socket clients
	this.broadcast.emit("new ball", { id: newBall.id, x: newBall.getX(), y: newBall.getY(), dx: newBall.getDX(), dy: newBall.getDY() });

	// Send existing balls to the new player
	var i, existingBall;
	for (i = 0; i < balls.length; i++) {
		existingBall = balls[i];
		this.emit("new ball", { id: existingBall.id, x: existingBall.getX(), y: existingBall.getY(), dx: existingBall.getDX(), dy: existingBall.getDY() });
	};
		
	// Add new ball to the balls array
	balls.push(newBall);
	
};

// Ball has moved
function onMoveBall(data) {
	// Find ball in array
	var moveBall = ballById(this.id);

	// Ball not found
	if (!moveBall) {
		util.log("Ball not found: " + data.id);
		return;
	};

	// Update ball position
	moveBall.setX(data.x);
	moveBall.setY(data.y);
	moveBall.setDX(data.dx);	// Updates the speed that is shown to the other players
	moveBall.setDY(data.dy);	// Updates the speed that is shown to the other players

	// Broadcast updated position to connected socket clients
	this.broadcast.emit("move ball", { id: moveBall.id, x: moveBall.getX(), y: moveBall.getY(), dx: moveBall.getDX(), dy: moveBall.getDY() });
};

// Food has been eaten 
function onRemoveFood(data) {
	var removeFood = foodById(data.number);
	// Food not found
	if (!removeFood) {
		util.log("Food not found: " + data.number);
		return;
	};

	// Remove food from foods array
	foods.splice(foods.indexOf(removeFood), 1);

	// Broadcast removed food to connected socket clients
	this.broadcast.emit("remove food", {number: data.number});

};

//A player has been eaten :( || :)
function onRemovePlayer(data) {
	console.log("Removing a player: " + data.id);
	var removePlayer = playerById(data.id);
	// player not found
	if (!removePlayer) {
		util.log("player not found to remove: " + data.id);
		return;
	};

	// Remove player from players array
	players.splice(players.indexOf(removePlayer), 1);

	// Broadcast removed player to connected socket clients
	this.broadcast.emit("remove player", {id: data.id, username: data.username});

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
	for (var i = 0; i < balls.length; i++) {
		if (balls[i].id == id)
			return balls[i];
	};
	
	return false;
};

// Find food by ID
function foodById(number) {
	for (var i = 0; i < foods.length; i++) {
		if (foods[i].number == number)
			return foods[i];
	};
	
	return false;
};



/**************************************************
** RUN THE GAME
**************************************************/
init();

exports.gameInit = init;
