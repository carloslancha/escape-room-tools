const Counter = require("./Counter.js");

class CounterCollection {
	constructor() {
		this.counters = [];
		this.countersCounter = 0;
	}

	add(config) {
		config.id = this.countersCounter;

		let counter = new Counter(config);

		this.counters.push(counter);

		this.countersCounter++;

		return counter;
	}

	getAll() {
		return this.counters;
	}

	getLast() {
		return this.counters[this.counters.length -1];
	}

	removeAll() {
		this.stopAll();
		this.counters = [];
		this.countersCounter = 0;
	}

	remove(counter) {
		let counterIndex = this.counters.indexOf(counter);

		if (counterIndex === -1) {
			return false;
		}

		counter.stop();
		this.counters.splice(counterIndex, 1);
	}

	stopAll() {
		this.counters.forEach((counter) => {
			counter.stop();
		});
	}
}

module.exports = CounterCollection;