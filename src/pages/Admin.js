import React, { Component } from 'react';

import Counter from '../components/Counter.js';
import socket from '../components/socket.js';

import './Admin.css';

class Admin extends Component {
	constructor(props) {
		super(props);

		this.state = {
			auxCounters: [],
			countingClues: [],
			lastClue: ''
		};
	}

	componentDidMount() {
		socket.on('countersChanged', (event) => {
			if (event.counters.length === 0) {
				return this._createMainCounter();
			}

			let mainCounter = event.counters.shift();

			this.setState(
				{
					auxCounters: event.counters,
					mainCounter: mainCounter,
					playingCounter: event.playing
				}
			);
		});

		socket.on('newClue', (event) => {
			this.setState(
				{
					countingClues: event.countingClues,
					lastClue: event.clue
				}
			);
		});

		socket.emit('getClue');
		socket.emit('getCounters');
	}

	componentWillUnmount() {
		socket.removeListener('countersChanged');
		socket.removeListener('newClue');
	}

	_addFiveMinutes() {
		this._createCounter({
			countdown: true,
			destroyOnEnd: true,
			endTime: 0,
			initialTime: 300
		});

		this._startCounter();
	}

	_createCounter(event) {
		socket.emit('createCounter', {
			countdown: event.countdown,
			destroyOnEnd: event.destroyOnEnd,
			endTime: event.endTime,
			initialTime: event.initialTime
		});
	}

	_createMainCounter() {
		this._createCounter({
			countdown: true,
			destroyOnEnd: false,
			endTime: 0,
			initialTime: 4200
		});
	}

	_handleNewClueChange(event) {
		this.setState({clue: event.target.value});
	}

	_newClue() {
		socket.emit('newClue', this.state.clue);
	}

	_newCountingClue() {
		socket.emit('newCountingClue', this.state.clue);
	}

	_removeClue() {
		socket.emit('removeClue');
	}

	_reset() {
		if (window.confirm('This will reset all the game to default values. Continue?')) {
			socket.emit('resetCounter');
			socket.emit('resetClues');
		}
	}

	_startCounter() {
		socket.emit('startCounter');
	}

	_stopCounter() {
		socket.emit('stopCounter');
	}

	render() {
		return (
			<div className="admin">
				<div className="container">
					<div className="col-md-12 text-center">
						{this.state.mainCounter &&
							<Counter time={this.state.mainCounter.time}	/>
						}

						{this.state.auxCounters.length > 0 &&
							<div className="aux-counters">
								{this.state.auxCounters.map((counter, i) => {
									return <Counter
										plusSymbol="true"
										time={counter.time}
										trim="true"
										key={i}	/>
								})}
							</div>
						}
					</div>
				</div>

				<div className="container">
					<div className="col-md-12 text-center">
						{!this.state.playingCounter &&
							<button className="btn btn-primary" onClick={() => this._startCounter()} type="button">Start</button>
						}
						{this.state.playingCounter &&
							<button className="btn btn-warning" onClick={() => this._stopCounter()} type="button">Stop</button>
						}
						{this.state.auxCounters.length === 0 &&
							<button className="btn btn-success" onClick={() => this._addFiveMinutes()} type="button">+5 Minutes</button>
						}
						<button className="btn btn-danger" onClick={() => this._reset()} type="button">Reset</button>
					</div>
				</div>

				<div className="container">
					<div>
						<span>Counting Clues: {this.state.countingClues.length}</span>
					</div>

					{this.state.lastClue &&
						<div>
							<span>Current clue: {this.state.lastClue}</span>
							<button className="btn btn-link" onClick={() => this._removeClue()}>
								<span className="glyphicon glyphicon-remove text-danger"></span>
							</button>
						</div>
					}

					<textarea className="form-control" onChange={this._handleNewClueChange.bind(this)} placeholder="Introduce a clue" rows="5" value={this.state.clue} />
					<button className="btn btn-primary pull-right" onClick={() => this._newCountingClue()} type="button">Send and Count</button>
					<button className="btn btn-primary pull-right" onClick={() => this._newClue()} type="button">Send</button>
				</div>
			</div>
		);
	}
}

export default Admin;
