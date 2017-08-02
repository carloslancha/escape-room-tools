import React, { Component } from 'react';

import './NeonGrid.css';

class NeonGrid extends Component {
	render() {
		return <div>
			<div className="stars"></div>
			<div className="twinkling"></div>
			<div className="clouds"></div>
			<div className="grid"></div>
		</div>
	}
}

export default NeonGrid;
