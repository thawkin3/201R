/**************************************************
** NODE.JS REQUIREMENTS
**************************************************/
var util = require('util');                 // Utility resources (logging, object inspection, etc)
var io = require('socket.io');              // Socket.IO
var Player = require('./Player').Player;    // Player class
var Ball = require('./Ball').Ball;          // Ball class
var Food = require('./Food').Food;          // Food class


/**************************************************
** GAME VARIABLES
**************************************************/
var socket;             // Socket controller
var players;            // Array of connected players
var balls;              // Array of connected balls
var foods;              // Array of food
var interval;           // Used as the interval to create food
var ballMotionInterval; // Used as the interval to move the balls
var moveBalls;          // Function move the balls
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
    };
    
    // Function to loop through to dynamically update the time interval
    var addFood = function() {
        interval = 2000 / ((players && Object.keys(players).length) ? Object.keys(players).length : 1);
        setTimeout(pushFood, interval);
    };
    
    // Call the pushFood function to set the food creation in motion
    pushFood();

    // Set up the loop for server side ball motion
    moveBalls = function() {
        if (Object.keys(players).length <= 0) {
            clearInterval(ballMotionInterval);
        }

        if (balls && Object.keys(balls).length) {
            var updatedBallsData = {};
            for (key in balls) {
                balls[key].update();
                updatedBallsData[key] = { id: balls[key].getId(), x: balls[key].getX(), y: balls[key].getY() };
            }
            socket.sockets.emit('move all balls', updatedBallsData);
        }
    };

    ballMotionInterval = setInterval(moveBalls, 16);
}


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
    var username = client.manager.handshaken[client.id].query.username || 'UNKNOWN';

    // CREATE THE NEW PLAYER

    // Calculate a random start position for the new player
    // and make sure it's not outside of the canvas bounds
    var startX = Math.floor( Math.random() * (1000 - 20) + 5 );
    var startY = Math.floor( Math.random() * (500 - 20) + 5 );

    // Create a start size and color
    var startSize = 10;
    var startColor = colors.splice(Math.floor(Math.random() * colors.length), 1)[0] || 'blue';

    // Initialize the new player
    players[client.id] = new Player(startX, startY, startSize, startColor, client.id, username);

    // SEND DATA TO THAT PLAYER AND TO ALL THE OTHER PLAYERS

    // Send the new player data to all the players (even the one that just connected)
    socket.sockets.emit('new player', { id: players[client.id].getId(), x: players[client.id].getX(), y: players[client.id].getY(), size: players[client.id].getSize(), color: players[client.id].getColor(), username: players[client.id].getUsername(), newPlayer: true });

    // Send the existing players data to the new player
    for (key in players) {
        var existingPlayer = players[key];
        if (existingPlayer.getId() !== client.id) {
            this.emit('new player', { id: existingPlayer.getId(), x: existingPlayer.getX(), y: existingPlayer.getY(), size: existingPlayer.getSize(), color: existingPlayer.getColor(), username: players[client.id].getUsername(), existingPlayer: true });
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

    // Re-set up the ball interval if this is the first player
    if (players && Object.keys(players).length === 1) {
        ballMotionInterval = setInterval(moveBalls, 16);
    }

    // ADD EVENT LISTENERS

    // Listen for client disconnected
    client.on('disconnect', onClientDisconnect);

    // Listen for move player message
    client.on('move player', onMovePlayer);

    // Listen for remove food message
    client.on('remove food', onRemoveFood);

    // Listen for remove player message
    client.on('remove player', onRemovePlayer);
}

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

    // Broadcast removed player to connected socket clients
    this.broadcast.emit('remove player', { id: this.id, username: playerToRemove.getUsername() });

    // Remove player from players array
    delete players[this.id];
}

// Player has moved
function onMovePlayer(data) {
    // Find player in array
    var playerToMove = playerById(data.id);

    // Player not found
    if (!playerToMove) {
        util.log('Player to move not found: ' + data.id);
        return;
    };

    // Update player position
    playerToMove.setX(data.x);
    playerToMove.setY(data.y);
    playerToMove.setSize(data.size);    // Updates the size that is shown to the other players

    // Broadcast updated position to connected socket clients
    if (data.hitByBall) {
        this.broadcast.emit('move player', { id: playerToMove.getId(), x: playerToMove.getX(), y: playerToMove.getY(), size: playerToMove.getSize(), color: playerToMove.getColor(), username: playerToMove.getUsername(), hitByBall: true });
    } else {
        this.broadcast.emit('move player', { id: playerToMove.getId(), x: playerToMove.getX(), y: playerToMove.getY(), size: playerToMove.getSize(), color: playerToMove.getColor() });
    }
}

// Food has been eaten 
function onRemoveFood(data) {
    var foodToRemove = foodById(data.id);
    
    // Food not found
    if (!foodToRemove) {
        util.log('Food to remove not found: ' + data.id);
        return;
    };

    // Broadcast removed food to connected socket clients
    this.broadcast.emit('remove food', { id: data.id });

    // Remove food from foods array
    delete foods[data.id];
}

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

    // Broadcast removed player to connected socket clients
    this.broadcast.emit('remove player', { id: data.id, eatenUsername: data.eatenUsername, eaterUsername: data.eaterUsername });

    // Remove player from players array
    delete players[data.id];
}


/**************************************************
** GAME HELPER FUNCTIONS
**************************************************/
// Create one or more balls
function createBalls(numberOfBallsToCreate) {
    var ballCollection = {};
    var possibleSpeeds = [[1,3], [2,3], [4,2]];
    for (var i = 0; i < numberOfBallsToCreate; i++) {
        var ballX = Math.floor( Math.random() * (1000 - 40) + 5 );
        var ballY = Math.floor( Math.random() * (500 - 40) + 5 );
        var ballDx = possibleSpeeds[i][0];
        var ballDy = possibleSpeeds[i][1];
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
}

// Find ball by ID
function ballById(id) {
    return balls[id];
}

// Find food by ID
function foodById(id) {
    return foods[id];
}


/**************************************************
** RUN THE GAME
**************************************************/
init();

exports.gameInit = init;
