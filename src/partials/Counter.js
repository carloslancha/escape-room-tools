'use strict';

import Component from 'metal-component';
import Soy from 'metal-soy';
import { Config } from 'metal-state';

import templates from './Counter.soy';

class Counter extends Component {};

Soy.register(Counter, templates);

Counter.STATE = {
	time: Config.number().required()
};

export default Counter;
