import React, { Component } from 'react';

import './Counter.css';

class Counter extends Component {
	render() {
		let classes = 'counter' + (this.props.className ? ' ' + this.props.className : '');

		let seconds = Math.floor(this.props.time % 3600 % 60);
		let minutes = Math.floor(this.props.time % 3600 / 60);
		let hours = Math.floor(this.props.time / 3600);

		hours = hours > 9 ? hours : '0' + hours;
		minutes = minutes > 9 ? minutes : '0' + minutes;
		seconds = seconds > 9 ? seconds : '0' + seconds;

		return <div className={classes}>
			{this.props.children}

			{(!this.props.trim || (this.props.trim && hours > 0)) &&
				<span>
					<span>{hours}</span>
					<span className={this.props.time % 2 === 0 ? 'invisible' : ''}> : </span>
				</span>
			}
			<span>{minutes}</span>
			<span className={this.props.time % 2 === 0 ? 'invisible' : ''}> : </span>
			<span>{seconds}</span>
		</div>
	}
}

export default Counter;
