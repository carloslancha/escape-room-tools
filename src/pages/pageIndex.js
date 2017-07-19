'use strict';

import 'electric-marble-components';
import Component from 'metal-component';
import Soy from 'metal-soy';
import { Config } from 'metal-state';

import '../partials/Counter';
import socket from '../partials/socket';
import templates from './index.soy';

class pageIndex extends Component {
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
};

Soy.register(pageIndex, templates);

pageIndex.STATE = {
	clue: Config.string(),
	counters: Config.array().value([])
};

export default pageIndex;
