import io from 'socket.io-client';

import { SOCKET_URL } from '../constants';

let socket;

if (!socket) {
	console.log('socket created');
	socket = io(SOCKET_URL);
}

export default socket;
