(function() {
	var socket = io.connect('http://localhost:8080', { 'forceNew': true });

	var clock,
		isPlaying;

	function bindEvents() {
		socket.on('updateTime', function(time) {
			clock.flip();
			clock.setTime(time);
		});

		socket.on('clue', function(clue, image) {
			$('#clue').html(clue);

			if (image) {
				$('#clue').prepend('<img src="/assets/images/' + image + '"/>');
			}
		});

		$('#play').click(function() {
			if (!isPlaying) {
				socket.emit('play');
				isPlaying = true;

				$(this).addClass('btn-primary');
				$('#pause').removeClass('btn-primary');
			}
		});

		$('#pause').click(function() {
			if (isPlaying) {
				socket.emit('pause');
				isPlaying = false;

				$(this).addClass('btn-primary');
				$('#play').removeClass('btn-primary');
			}
		})

		$('#reset').click(function() {
			socket.emit('reset');
			isPlaying = false;

			$('#play').removeClass('btn-primary');
			$('#pause').removeClass('btn-primary');
		});

		$('#addClue').click(function() {
			var clueImage = $('#newClueImage').val();
			var clueText = $('#newClueText').val();

			socket.emit('new-clue', clueText, clueImage);

			$('#newClueText').val('');
		});

		$('#hideClue').click(function() {
			socket.emit('hide-clue');
		});

		$('#playSound').click(function() {
			var sound = $('#sound').val();

			socket.emit('stop-sound');
			socket.emit('play-sound', sound);

			$(this).addClass('btn-primary');
		});

		$('#stopSound').click(function() {
			socket.emit('stop-sound');

			$('#playSound').removeClass('btn-primary');
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

	function getImages() {
		$.ajax('http://localhost:8080/getImages', {
			type: 'POST',
			contentType: 'application/json',
			success: function(images) { 
				var imagesSelectElement = $('#newClueImage');

				images.forEach(function(image) {
					imagesSelectElement.append($('<option>').attr('value', image).text(image));
				})
			},
			error: function() { console.log('error');}
		});
	}

	function getSounds() {
		$.ajax('http://localhost:8080/getSounds', {
			type: 'POST',
			contentType: 'application/json',
			success: function(sounds) { 
				var imagesSelectElement = $('#sound');

				sounds.forEach(function(sound) {
					imagesSelectElement.append($('<option>').attr('value', sound).text(sound));
				})
			},
			error: function() { console.log('error');}
		});
	}

	$(function() {
		bindEvents();

		createClock();

		getImages();
		getSounds();
	});
})();