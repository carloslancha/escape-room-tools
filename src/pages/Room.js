import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

import Counter from '../components/Counter.js';
import NeonGrid from '../components/NeonGrid.js';
import Terminal from '../components/Terminal.js';
import socket from '../components/socket.js';

import './Room.css';

class Room extends Component {
	constructor(props) {
		super(props);

		this.state = {
			clue: '',
			countingClues: []
		};
	}

	componentDidMount() {
		socket.on('countersChanged', (event) => {
			let mainCounter = event.counters.shift();
			let extraCounter = event.counters.shift();

			this.setState(
				{
					extraCounter: extraCounter,
					mainCounter: mainCounter
				}
			);
		});

		socket.on('newClue', (event) => {
			this.setState(
				{
					clue: event.clue,
					countingClues: event.countingClues
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

	render() {
		let countersClasses = 'counters' + (this.state.extraCounter ? ' marginless' : '');

		return (
			<div className="room">
				<div className="clueCounters">
					{this.state.countingClues.map((clue, i) => {
						return <div className="clueCounter">
							<span className="glyphicon glyphicon-star" aria-hidden="true"></span>
						</div>
					})}
				</div>
				<div className={countersClasses}>
					{this.state.mainCounter &&
						<Counter className="text-center" time={this.state.mainCounter.time}	/>
					}

					{this.state.extraCounter &&
						<Counter className="extra-counter text-center" time={this.state.extraCounter.time} trim="true">
							<p>BONUS TIME!</p>
						</Counter>
					}
				</div>

				{this.state.clue &&
					<div className="container clue">
						<Terminal>
							{this.state.clue}
						</Terminal>
					</div>
				}

				<NeonGrid />
			</div>
		);
	}
}

export default Room;
