# Escape Room Tools

## Setup

1. Install NodeJS >= [v6.3.1](https://nodejs.org/), if you don't have it yet.

2. Install local dependencies:

  ```
  npm install
  ```

3. For development:

	3.1 Start the react development server

	  ```
	  npm run dev:client
	  ```

	3.2 Start the express server

	  ```
	  npm run dev:server
	  ```

	3.3 Open the room at http://localhost:3000/room on your browser

	3.4 Open the admin at http://localhost:3000/admin on your browser to see the administration.

4. For production

	4.1 Change the IP with your public computer one in `src/constants.js`

	```
	const PROD_SOCKET_URL = 'http://yourpublicIP:8080';

	```

	4.2 Build the program

	```
	npm run build
	```

	4.3 Start the server

	```
	npm run prod:server
	```

	Or just run both with

	```
	npm run prod
	```

	4.4 Open the room at http://localhost:8080/room on your browser

	4.5 Open the admin at http://localhost:8080/admin on your browser to see the administration.

5. Have fun.