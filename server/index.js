const express = require('express');
const path = require('path');
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var CONFIG = require('./config.js');

// SOCKET CONNECTION
io.on('connection', function(socket) {
	// SOCKET EVENTS

	/*
	socket.on('eventName', (event) => {
		...
		io.sockets.emit('eventName', ...args);
	});
	*/
});

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

server.listen(CONFIG.PORT, () => {
  console.log(`App listening on port ${CONFIG.PORT}!`);
});

