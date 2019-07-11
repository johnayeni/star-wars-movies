import React from 'react';
import ReactDOM from 'react-dom';
import { toast } from 'react-toastify';
import 'assets/styles/main.scss';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

toast.configure();
// eslint-disable-next-line no-undef
ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.register();
