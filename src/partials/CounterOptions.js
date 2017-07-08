'use strict';

import Component from 'metal-component';
import Soy from 'metal-soy';
import { Config } from 'metal-state';

import templates from './CounterOptions.soy';

class CounterOptions extends Component {
	_handleCreateCounter() {
		let countdown = this.refs.countdown.checked;
		let destroyOnEnd = this.refs.destroyOnEnd.checked;

		let endTimeHours = parseInt(this.refs.endTimeHours.value);
		let endTimeMinutes = parseInt(this.refs.endTimeMinutes.value);
		let endTimeSeconds = parseInt(this.refs.endTimeSeconds.value);
		let endTime = endTimeSeconds + (endTimeMinutes * 60) + (endTimeHours * 3600);

		let initialTimeHours = parseInt(this.refs.initialTimeHours.value);
		let initialTimeMinutes = parseInt(this.refs.initialTimeMinutes.value);
		let initialTimeSeconds = parseInt(this.refs.initialTimeSeconds.value);
		let initialTime = initialTimeSeconds + (initialTimeMinutes * 60) + (initialTimeHours * 3600);

		this.emit('createCounter', {
			countdown: countdown,
			destroyOnEnd: destroyOnEnd,
			endTime: endTime,
			initialTime: initialTime
		});
	}

	_handleResetCounter() {
		this.emit('resetCounter');
	}

	_handleStartCounter() {
		this.emit('startCounter');
	}

	_handleStopCounter() {
		this.emit('stopCounter');
	}
};

Soy.register(CounterOptions, templates);

CounterOptions.STATE = {
	destroyOnEndChecked: Config.bool()
};

export default CounterOptions;
