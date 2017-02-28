var socket = io.connect('http://localhost:8080', { 'forceNew': true });

socket.on('updateTime', function(time) {
	time = millisToMinutesAndSeconds(time);

	document.querySelector('.min').innerHTML = time.minutes;
	document.querySelector('.sec').innerHTML = time.seconds;
});

socket.on('clue', function(clue) {  
	render(clue);
});

function render(clue) {
	document.querySelector('#clue').innerHTML = clue;
}

function addClue(event) {
	var newClue = document.querySelector('#newClue').value;

	socket.emit('new-clue', newClue);

	return false;
}

function play() {
	socket.emit('play');
	return false;
}

function pause() {
	socket.emit('pause');
	return false;
}

function resetAll() {
	socket.emit('reset');
	return false;
}

function hideClue(event) {
	socket.emit('hide-clue');
	return false;
}

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return {
  	minutes: (minutes < 10 ? '0' : '') + minutes,
  	seconds: (seconds < 10 ? '0' : '') + seconds
  };
}