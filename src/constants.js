const DEV_SOCKET_URL = 'http://localhost:3001';
const PROD_SOCKET_URL = 'http://localhost:8080';

function getSocketURL() {
	let url;

	switch (process.env.NODE_ENV) {
		case 'development':
			url = DEV_SOCKET_URL;
			break;
			default:
			url = PROD_SOCKET_URL;
	}

	return url;
}

const SOCKET_URL = getSocketURL();

export {
	SOCKET_URL
};