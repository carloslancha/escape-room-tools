var express = require('express');  
var app = express();  
var server = require('http').Server(app);  
var io = require('socket.io')(server);

app.use(express.static('public'));

var clue;

var time = 3600000,
	timer;

io.on('connection', function(socket) {
	console.log('Somebody is connected with Sockets');
	socket.emit('clue', clue);

	socket.on('play', function() {
		timer = setInterval(function() {
			time -= 1000;

			if (time > 0) {
				io.sockets.emit('updateTime', time);
			}
			else {
				clearInterval(timer);
				io.sockets.emit('updateTime', time);
				io.sockets.emit('end');
			}
		},
		1000);
	});

	socket.on('pause', function() {
		clearInterval(timer);
	});

	socket.on('reset', function() {
		clearInterval(timer);
		time = 3600000;
		io.sockets.emit('updateTime', time);

		clue = undefined;
		io.sockets.emit('clue', clue);
	});

	socket.on('new-clue', function(clue) {
		io.sockets.emit('clue', clue);
	});

	socket.on('hide-clue', function() {
		clue = undefined;

		io.sockets.emit('clue', clue);
	});
});

server.listen(8080, function() {  
	console.log("Server running in http://localhost:8080");
});