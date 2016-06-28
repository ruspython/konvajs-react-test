import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import reducers from './reducers';
import configureStore from './store/configureStore';

import Home from './components/Home';
import Test from './components/Test';

const store = configureStore();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={history}>
      <Route path="/" component={Home}>
        <Route path="/test" component={Test}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
);
