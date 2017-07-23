const DEV_PORT = 3001;
const PROD_PORT = 8080;

function getPort() {
	switch (process.env.NODE_ENV) {
		case 'development':
			return DEV_PORT;
		break;
		default:
			return PROD_PORT;
	}
}

module.exports = {
	PORT: getPort()
};