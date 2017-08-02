import React, { Component } from 'react';

import './Terminal.css';

class Terminal extends Component {
	render() {
		return <div id="terminal-window">
			<div id="terminal-toolbar">
				<div className="terminal-top">
					<div id="terminal-title" className="text-center">
						D.A.R.Y.L.@localhost:~
					</div>
				</div>
			</div>
			<div id="terminal-body">
				<p>
					{this.props.children}
				</p>
			</div>
		</div>
	}
}

export default Terminal;
