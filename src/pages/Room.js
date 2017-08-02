import React, { Component } from 'react';
import Sound from 'react-sound';

import Counter from '../components/Counter.js';
import NeonGrid from '../components/NeonGrid.js';
import Terminal from '../components/Terminal.js';
import socket from '../components/socket.js';

import './Room.css';
import endMp3 from '../assets/end.mp3';
import newClueMp3 from '../assets/new-clue.mp3';

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
					mainCounter: mainCounter,
					playEndSound: mainCounter && mainCounter.time === 0
				}
			);
		});

		socket.on('newClue', (event) => {
			this.setState(
				{
					clue: event.clue,
					countingClues: event.countingClues,
					playClueSound: !!event.clue
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

				{this.state.playClueSound &&
					<Sound
						onFinishedPlaying={() => {this.setState({playClueSound: false})}}
						playStatus={this.state.playClueSound ? Sound.status.PLAYING : Sound.status.STOPPED}
						url={newClueMp3}
				    />
				}

				{this.state.playEndSound &&
					<Sound
						onFinishedPlaying={() => {this.setState({playEndSound: false})}}
						playStatus={this.state.playEndSound ? Sound.status.PLAYING : Sound.status.STOPPED}
						url={endMp3}
				    />
				}
			</div>
		);
	}
}

export default Room;
