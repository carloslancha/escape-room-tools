'use strict';

import Component from 'metal-component';
import Soy from 'metal-soy';
import { Config } from 'metal-state';

import socket from './socket';
import templates from './Clues.soy';

class Clues extends Component {
	_handleSubmitClue(event) {
		event.preventDefault();

		let clue = this.refs.clue.value;

		this.refs.clue.value = '';

		this.emit('newClue', {
			clue: clue
		});
	}

	_handleRemoveClue() {
		this.emit('removeClue');
	}
};

Soy.register(Clues, templates);

Clues.STATE = {
	clue: Config.string()
};

export default Clues;
