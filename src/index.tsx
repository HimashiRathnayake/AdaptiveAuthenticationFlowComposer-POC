import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore, applyMiddleware, Store, CombinedState} from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import {rootReducer} from "./store/reducers"
import ReactModal from "react-modal";
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

const store: Store<CombinedState<{ astReducer: AstState; stepReducer: StepsState; }>, AstAction | StepAction> & {
    dispatch: DispatchType
} = createStore(rootReducer, applyMiddleware(thunk))

ReactModal.setAppElement('#root');

ReactDOM.render(
    // <React.StrictMode>
        <Provider store={store}>
            <ReactNotification/>
            <App/>
        </Provider>,
    // </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();