import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import socket from '../components/socket.js';

class Admin extends Component {
	render() {
		return (
			<div className="Admin">
				Admin
				<Link to="/room">Go To Room</Link>
			</div>
		);
	}
}

export default Admin;
