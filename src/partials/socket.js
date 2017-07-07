'use strict';

import io from 'socket.io-client';

let socket;

if (!socket) {
	console.log('socket created');
	socket = io('http://localhost:8080');
}

export default socket;
