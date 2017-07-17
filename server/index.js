var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var CounterCollection = require("./CounterCollection.js");

let clue;
let counterCollection = new CounterCollection();

function massageCounterData(counter) {
	return {
		countdown: counter.countdown,
		endTime: counter.endTime,
		id: counter.id,
		initialTime: counter.initialTime,
		time: counter.time
	};
}

function massageCounters(counters) {
	let massagedCounters = [];

	counters.forEach((counter) => {
		massagedCounters.push(massageCounterData(counter));
	});

	return massagedCounters;
}


// SOCKET EVENTS
io.on('connection', function(socket) {

	// COUNTERS EVENTS
	socket.on('createCounter', (config) => {
		let counter = counterCollection.add(config);

		counter.on('timeUpdated', (time) => {
			io.sockets.emit('countersChanged', {
				counters: massageCounters(counterCollection.getAll())
			});
		});

		counter.on('timeEnded', () => {
			if (counter.destroyOnEnd) {
				counterCollection.remove(counter);

				let lastCounter = counterCollection.getLast();

				if (lastCounter) {
					lastCounter.start();
				}

				io.sockets.emit('countersChanged', {
					counters: massageCounters(counterCollection.getAll())
				});
			}
		});

		io.sockets.emit('countersChanged', {
			counters: massageCounters(counterCollection.getAll())
		});
	});

	socket.on('getCounters', () => {
		io.sockets.emit('countersChanged', {
			counters: massageCounters(counterCollection.getAll())
		});
	});

	socket.on('startCounter', () => {
		let lastCounter = counterCollection.getLast();

		if (!lastCounter) {
			io.sockets.emit('counterError', {
				error: 'No counters found'
			});
			return false;
		}

		counterCollection.stopAll();

		lastCounter.start();

		io.sockets.emit('countersChanged', {
			counters: massageCounters(counterCollection.getAll())
		});
	});

	socket.on('stopCounter', () => {
		let lastCounter = counterCollection.getLast();

		lastCounter.stop();

		io.sockets.emit('countersChanged', {
			counters: massageCounters(counterCollection.getAll())
		});
	});

	socket.on('resetCounter', () => {
		counterCollection.removeAll();

		io.sockets.emit('countersChanged', {
			counters: massageCounters(counterCollection.getAll())
		});
	});

	// CLUES EVENTS
	socket.on('getClue', (newClue) => {
		io.sockets.emit('newClue', clue);
	});

	socket.on('newClue', (newClue) => {
		if (newClue === '') {
			return false;
		}

		clue = newClue;

		io.sockets.emit('newClue', clue);
	});

	socket.on('removeClue', () => {
		clue = undefined;

		io.sockets.emit('newClue', clue);
	});
});

app.use(express.static('dist'));

server.listen(8080, function() {
	console.log("Server running in http://localhost:8080");
});