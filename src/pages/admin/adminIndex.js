'use strict';

import 'electric-marble-components';
import Component from 'metal-component';
import Soy from 'metal-soy';
import { Config } from 'metal-state';

import '../../layouts/main.soy.js';
import '../../partials/Clues';
import '../../partials/Counter';
import '../../partials/CounterOptions';
import '../../partials/Topbar.soy.js';
import socket from '../../partials/socket';
import templates from './index.soy';

class adminIndex extends Component {
	created() {
		socket.on('countersChanged', (event) => {
			this.counters = event.counters;
		});

		socket.on('newClue', (clue) => {
			this.clue = clue;
		});

		socket.emit('getClue');
		socket.emit('getCounters');
	}

	_createCounter(event) {
		socket.emit('createCounter', {
			countdown: event.countdown,
			destroyOnEnd: event.destroyOnEnd,
			endTime: event.endTime,
			initialTime: event.initialTime
		});
	}

	_newClue(event) {
		socket.emit('newClue', event.clue);
	}

	_removeClue() {
		socket.emit('removeClue');
	}

	_resetCounter() {
		socket.emit('resetCounter');
	}

	_startCounter() {
		socket.emit('startCounter');
	}

	_stopCounter() {
		socket.emit('stopCounter');
	}
};

Soy.register(adminIndex, templates);

adminIndex.STATE = {
	clue: Config.string(),
	counters: Config.array().value([])
};

export default adminIndex;
