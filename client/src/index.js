import React, { Profiler } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import BaseLayout from './BaseLayout'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './Login';
import AccountList from './AccountList';
import Profile from './Profile';
import { createStore } from 'redux'
import reducer from './store/reducer';
import { Provider } from 'react-redux'
import requireAuth from './requireAuth';
import { setAuthenticationHeader } from './utils/authenticate';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const token = localStorage.getItem("jsonwebtoken")
setAuthenticationHeader(token) // axios 

// perform a dispatch to change the global state 
if(token) {
  store.dispatch({type: 'ON_LOGGED_IN' })
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store = {store}>
      <BaseLayout>  
        <Switch>
          <Route exact path = "/" component = {Login} />
          <Route exact path = "/accounts" component = {requireAuth(AccountList)} />
          <Route exact path = "/profile" component = {requireAuth(Profile)} />
        </Switch>
      </BaseLayout>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,    
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
