import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/styles/main.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

// eslint-disable-next-line no-undef
ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.register();
