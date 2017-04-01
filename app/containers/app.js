import React, {Component} from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import promise from 'redux-promise';

import reducers from '../reducers';
import DNApp from './dnApp.js';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const store = createStoreWithMiddleware(reducers);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <DNApp />
      </Provider>
    );
  }
}