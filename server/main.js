var express = require('express');  
var app = express();  
var server = require('http').Server(app);  
var io = require('socket.io')(server);
var fs = require('fs');
var path = require('path');


var time,
	timer,
	imageList;

function setDefaults() {
	time = 3600;	//seconds
}

function play() {
	if (timer) {
		return false;
	}

	timer = setInterval(function() {
		time -= 1;

		io.sockets.emit('updateTime', time);

		if (time <= 0) {
			clearInterval(timer);
			io.sockets.emit('end');
		}
	},
	1000);
}

function pause() {
	clearInterval(timer);
	timer = undefined;
}

function reset() {
	pause();
	setDefaults();
	io.sockets.emit('updateTime', time);
	hideClue();
}

function sendClue(clue, image) {
	io.sockets.emit('clue', clue, image);
}

function hideClue() {
	sendClue('');
}

function playSound(sound) {
	io.sockets.emit('play-sound', sound);
}

function stopSound() {
	io.sockets.emit('stop-sound');
}

io.on('connection', function(socket) {

	socket.on('play', play);

	socket.on('pause', pause);

	socket.on('reset', reset);

	socket.on('new-clue', sendClue);

	socket.on('hide-clue', hideClue);

	socket.on('play-sound', playSound);

	socket.on('stop-sound', stopSound);
});


app.post('/getImages', function(req, res){
	fs.readdir(path.join(__dirname, '..', 'public', 'assets', 'images'), function(err, images) {
		var imageList = [];

		images.forEach(function(image) {
			if (image.split('.')[1] === 'jpg') {
				imageList.push(image);
			}
		})

		res.send(imageList);
	});
});

app.post('/getSounds', function(req, res){
	fs.readdir(path.join(__dirname, '..', 'public', 'assets', 'sounds'), function(err, sounds) {
		var soundList = [];

		sounds.forEach(function(sound) {
			if (sound.split('.')[1] === 'ogg') {
				soundList.push(sound.split('.')[0]);
			}
		})

		res.send(soundList);
	});
});


app.use(express.static('public'));
app.use(express.static('node_modules'));

setDefaults();

server.listen(8080, function() {  
	console.log("Server running in http://localhost:8080");
});