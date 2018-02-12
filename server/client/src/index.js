import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import reduxThunk from 'redux-thunk';
import 'materialize-css/dist/css/materialize.min.css';
import axios from 'axios';
window.axios=axios;


const store =createStore(rootReducer, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
