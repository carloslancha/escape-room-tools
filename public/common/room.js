(function() {
	var socket = io.connect('http://localhost:8080', { 'forceNew': true });

	var clock;

	function bindEvents() {
		socket.on('updateTime', function(time) {
			clock.flip();
			clock.setTime(time);
		});

		socket.on('clue', function(clue, image) {
			$('#clue').html(clue);

			if (clue || image) {
				document.querySelector('#newClueAudio').play();

				$('.thematic-item.nc-only').hide();

				if (image) {
					$('#clue').prepend('<img src="/assets/images/' + image + '"/>');
				}
			}
			else {
				$('.thematic-item.nc-only').show();
			}
		});

		socket.on('play-sound', function(sound) {
			if (sound !== '') {
				$('body').append('<audio id="customSound" loop><source src="/assets/sounds/' + sound + '.ogg" type="audio/ogg"/><source src="/assets/sounds/' + sound + '.mp3" type="audio/mp3"/></audio>');
				document.querySelector('#customSound').play();
			}
		});

		socket.on('stop-sound', function() {
			var customSound = document.querySelector('#customSound');

			if (customSound) {
				customSound.pause();
				$('#customSound').remove();
			}
		});

		socket.on('end', function() {
			document.querySelector('#endAudio').play();
			setTimeout(function() {
				document.querySelector('#endAudio').pause();
			},
			10000);
		});
	}

	function createClock() {
		clock  = $('#clock').FlipClock(
			3600,
			{
				autoStart: false,
				clockFace: 'MinuteCounter',
				countdown: true
			});
		clock.flip();
	}

	$(function(){
		bindEvents();

		createClock();
	});
})();