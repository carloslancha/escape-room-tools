import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Room extends Component {
	render() {
		return (
			<div className="Room">
				Room
				<Link to="/admin">Go To Admin</Link>
			</div>
		);
	}
}

export default Room;
