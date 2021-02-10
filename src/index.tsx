import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux"
import ReactModal from "react-modal";
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import {store} from './store';

ReactModal.setAppElement('#root');

ReactDOM.render(
    <Provider store={store}>
        <ReactNotification/>
        <App/>
    </Provider>,
    document.getElementById('root')
);

reportWebVitals();