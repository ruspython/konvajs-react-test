import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import middleware from "./clientMiddleware";
import {devTools, persistState} from 'redux-devtools';
import * as reducers from '../reducers/index';

let createStoreWithMiddleware;

// Configure the dev tools when in DEV mode
if (__DEV__) {
  createStoreWithMiddleware = compose(
    applyMiddleware(thunkMiddleware, middleware),
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);
} else {
  createStoreWithMiddleware = applyMiddleware(thunkMiddleware, middleware)(createStore);
}

const rootReducer = combineReducers({
  ...reducers,
  routing: routerReducer
});

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
