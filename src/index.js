import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import Room from './pages/Room';

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route exact path="/admin" component={Admin} />
			<Route exact path="/room" component={Room} />
			<Route component={NotFound} />
		</Switch>
	</BrowserRouter>,
	document.getElementById('root')
);