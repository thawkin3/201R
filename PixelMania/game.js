/**************************************************
** NODE.JS REQUIREMENTS
**************************************************/
var util = require('util');					// Utility resources (logging, object inspection, etc)
var io = require('socket.io');				// Socket.IO
var Player = require('./Player').Player;	// Player class
var Ball = require('./Ball').Ball;			// Ball class
var Food = require('./Food').Food;			// Food class


/**************************************************
** GAME VARIABLES
**************************************************/
var socket;				// Socket controller
var players;			// Array of connected players
var balls;				// Array of connected balls
var foods;				// Array of food
var numUsers;			// Gets current count of users in the game
var interval;			// Used as the interval to create food
var ballMotionInterval;	// Used as the interval to move the balls
var moveBalls;			// Function move the balls
// Array of colors for players
var colors = [
	'green',
	'blue',
	'yellow',
	'pink',
	'limegreen',
	'orange',
	'purple',
	'coral',
	'darkkhaki',
	'gold',
	'palevioletred',
	'aqua',
	'brown',
	'cadetblue',
	'cornflowerblue',
	'darkmagenta',
	'deeppink',
	'plum',
	'springgreen',
	'slategrey',
];


/**************************************************
** GAME INITIALIZATION
**************************************************/
function init() {
	// Create an empty object to store players
	players = {};

	// Create an empty object to store balls and then add three balls to it
	balls = createBalls(3);

	// Create an empty object to store the food
	foods = {};

	// Set up Socket.IO to listen on port 3005
	socket = io.listen(3005);

	// Configure Socket.IO
	socket.configure(function() {
		// Only use WebSockets
		socket.set('transports', ['websocket']);

		// Restrict log output
		socket.set('log level', 2);
	});

	// Start listening for events
	setEventHandlers();

	// Init for timer
	numUsers = 1;

	// Start creating food
	var pushFood = function() {
		// Check if there are more users; if so, change interval to produce more food
		if (Object.keys(foods).length <= 30) {
			var foodX = Math.floor(Math.random() * (1000 - 20) + 5);
			var foodY = Math.floor(Math.random() * (500 - 20) + 5);
			
			// Initialize the server food
			var foodId = generateRandomString();
			var food = new Food(foodX, foodY, foodId);
			
			foods[foodId] = food;

			// Send this new food message to all the players
			socket.sockets.emit('new food', { x: food.getX(), y: food.getY(), id: food.getId() });
		}

		// Call this function, which will create a recursive loop with pushFood()
		addFood();
	}
	
	// Function to loop through to dynamically update the time interval
	var addFood = function() {
		interval = 2000 / numUsers;
		setTimeout(pushFood, interval);
	}
	
	// Call the pushFood function to set the food creation in motion
	pushFood();

	// Set up the loop for server side ball motion
	moveBalls  = function() {
		if (Object.keys(players).length <= 0) {
			clearInterval(ballMotionInterval);
		}

		if (balls && Object.keys(balls).length) {
			for (key in balls) {
				balls[key].update();
				socket.sockets.emit('move ball', { id: balls[key].getId(), x: balls[key].getX(), y: balls[key].getY() });
			}
		}
	}

	ballMotionInterval = setInterval(moveBalls, 16);
};


/**************************************************
** GAME EVENT HANDLERS
**************************************************/
var setEventHandlers = function() {
	// Socket.IO
	socket.sockets.on('connection', onSocketConnection);
};

// New socket connection (a new player has joined and connected to the server)
function onSocketConnection(client) {
	util.log('New player has connected: ' + client.id);

	// CREATE THE NEW PLAYER

	// Calculate a random start position for the new player
	// and make sure it's not outside of the canvas bounds
	var startX = Math.floor( Math.random() * (1000 - 20) + 5 );
	var startY = Math.floor( Math.random() * (500 - 20) + 5 );

	// Create a start size and color
	var startSize = 10;
	var startColor = colors.splice(Math.floor(Math.random() * colors.length), 1)[0] || 'blue';

	// Initialize the new player
	players[client.id] = new Player(startX, startY, startSize, startColor, client.id);

	// SEND DATA TO THAT PLAYER AND TO ALL THE OTHER PLAYERS

	// Send the new player data to all the players
	socket.sockets.emit('new player', { id: players[client.id].getId(), x: players[client.id].getX(), y: players[client.id].getY(), size: players[client.id].getSize(), color: players[client.id].getColor() });

	// Send the existing players data to the new player
	for (key in players) {
		var existingPlayer = players[key];
		if (existingPlayer.getId() !== client.id) {
			this.emit('new player', { id: existingPlayer.getId(), x: existingPlayer.getX(), y: existingPlayer.getY(), size: existingPlayer.getSize(), color: existingPlayer.getColor() });
		}
	}

	// Send the existing food data to the new player
	for (key in foods) {
		var existingFood = foods[key];
		this.emit('new food', { id: existingFood.getId(), x: existingFood.getX(), y: existingFood.getY() });
	}

	// Send the existing balls data to the new player
	for (key in balls) {
		var existingBall = balls[key];
		this.emit('new ball', { id: existingBall.getId(), x: existingBall.getX(), y: existingBall.getY() });
	};

	// Tell the food creator that there is another person in the game
	numUsers++;

	// Re-set up the ball interval if this is the first player
	ballMotionInterval = setInterval(moveBalls, 16);

	// ADD EVENT LISTENERS

	// Listen for client disconnected
	client.on('disconnect', onClientDisconnect);

	// Listen for move player message
	client.on('move player', onMovePlayer);

	// Listen for remove food message
	client.on('remove food', onRemoveFood);

	// Listen for remove player message
	client.on('remove player', onRemovePlayer);
};

// Socket client has disconnected
function onClientDisconnect() {
	util.log('Player has disconnected: ' + this.id);
	var playerToRemove = playerById(this.id);

	// Player not found
	if (!playerToRemove) {
		util.log('Player to disconnect not found: ' + this.id);
		return;
	}

	// Add the color back into the array of possible colors
	colors.push(playerToRemove.getColor());

	// Remove player from players array
	delete players[this.id];

	// Broadcast removed player to connected socket clients
	this.broadcast.emit('remove player', { id: this.id });

	// Tell the food creator that there is one less person in the game
	numUsers--;
};

// Player has moved
function onMovePlayer(data) {
	// Find player in array
	var playerToMove = playerById(this.id);

	// Player not found
	if (!playerToMove) {
		util.log('Player to move not found: ' + this.id);
		return;
	};

	// Update player position
	playerToMove.setX(data.x);
	playerToMove.setY(data.y);
	playerToMove.setSize(data.size);	// Updates the size that is shown to the other players

	// Broadcast updated position to connected socket clients
	this.broadcast.emit('move player', { id: playerToMove.getId(), x: playerToMove.getX(), y: playerToMove.getY(), size: playerToMove.getSize(), color: playerToMove.getColor() });
};

// Food has been eaten 
function onRemoveFood(data) {
	var foodToRemove = foodById(data.id);
	
	// Food not found
	if (!foodToRemove) {
		util.log('Food to remove not found: ' + data.id);
		return;
	};

	// Remove food from foods array
	delete foods[data.id];

	// Broadcast removed food to connected socket clients
	this.broadcast.emit('remove food', { id: data.id });

};

// A player has been eaten :( || :)
function onRemovePlayer(data) {
	var playerToRemove = playerById(data.id);
	
	// Player not found
	if (!playerToRemove) {
		util.log('Player to remove not found: ' + data.id);
		return;
	};

	// Add the color back into the array of possible colors
	colors.push(playerToRemove.getColor());

	// Remove player from players array
	delete players[data.id];

	// Broadcast removed player to connected socket clients
	this.broadcast.emit('remove player', { id: data.id, username: data.username });

};


/**************************************************
** GAME HELPER FUNCTIONS
**************************************************/
// Create one or more balls
function createBalls(numberOfBallsToCreate) {
	var ballCollection = {};
	for (var i = 0; i < numberOfBallsToCreate; i++) {
		var ballX = Math.floor( Math.random() * (1000 - 40) + 5 );
		var ballY = Math.floor( Math.random() * (500 - 40) + 5 );
		var ballDx = Math.floor(Math.random() * 3) + 1;
		var ballDy = Math.floor(Math.random() * 3) + 1;
		var ballId = generateRandomString();
		ballCollection[ballId] = new Ball(ballX, ballY, ballDx, ballDy, ballId);
	}
	return ballCollection;
}

// Generate random string
function generateRandomString() {
	return (Math.random()*999999999999).toFixed();
}

// Find player by ID
function playerById(id) {
	return players[id];
};

// Find ball by ID
function ballById(id) {
	return balls[id];
};

// Find food by ID
function foodById(id) {
	return foods[id];
};


/**************************************************
** RUN THE GAME
**************************************************/
init();

exports.gameInit = init;
