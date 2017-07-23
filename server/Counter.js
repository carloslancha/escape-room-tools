const EventEmitter = require('events');

class Counter extends EventEmitter {
	constructor(opt_config) {
		super();

		this.countdown = opt_config.countdown || false;
		this.destroyOnEnd = opt_config.destroyOnEnd || false;
		this.endTime = opt_config.endTime;
		this.initialTime = opt_config.initialTime || 0;
		this.time = this.initialTime;
	}

	reset() {
		this.stop();

		this.time = this.initialTime;
	}

	start() {
		if (this._timer) {
			return false;
		}

		this._timer = setInterval(() => {
			if ((this.countdown && this.time <= this.endTime) ||
				(!this.countdown && this.time >= this.endTime)) {
				this.stop();
				this.emit('timeEnded');
				return false;
			}

			if (this.countdown) {
				this.time -= 1;
			}
			else {
				this.time +=1
			}

			this.emit('timeUpdated', this.time);
		},
		1000);

		return this.time;
	}

	stop() {
		clearInterval(this._timer);
		this._timer = undefined;
	}
}

module.exports = Counter;