import React, {Component} from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import promise from 'redux-promise';
import logger from 'redux-logger'

import reducers from './reducers';
import DNApp from './containers/dnApp';

const createStoreWithMiddleware = applyMiddleware(promise, logger)(createStore);
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