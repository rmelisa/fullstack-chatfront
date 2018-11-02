import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { connect, Provider } from 'react-redux'
import { createStore } from 'redux'
import Authentication from './Authentication'

let reducer = function (state, action) {
    if (action.type === 'loggedIn') {
        return {...state, logged: action.success}
    }
    if (action.type === 'setMessages') {
        return {...state, messages: action.msgs}
    }
    if (action.type === 'setActiveUsers') {
        return {...state, activeUsers: action.users}
    }
    
    return state; 
}

const store = createStore(
    reducer,
    {
        logged: false,
        messages: [],
        activeUsers: []
    }, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

let contents = <Provider store={store}>
    <App/>
</Provider>


ReactDOM.render(contents, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
