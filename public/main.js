var socket = io.connect('http://localhost:8080', { 'forceNew': true });

var countdownTimer;
var countdown;

socket.on('updateTime', function(time) {
	time = millisToMinutesAndSeconds(time);

	document.querySelector('.min').innerHTML = time.minutes;
	document.querySelector('.sec').innerHTML = time.seconds;
});

socket.on('end', function() {
	document.querySelector('#end').play();
});

socket.on('clue', function(clue) {
		render(clue);
		if (clue) {
			document.querySelector('#notice').play();
		}
});

function render (clue) {
	document.querySelector('#clue').innerHTML = clue;
}

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return {
  	minutes: (minutes < 10 ? '0' : '') + minutes,
  	seconds: (seconds < 10 ? '0' : '') + seconds
  };
}