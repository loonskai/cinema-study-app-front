import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducer from './reducers/index';

interface WindowExtended extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
}

const composeEnhancers =
  typeof window === 'object' &&
  (window as WindowExtended).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as WindowExtended).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, logger));

export default createStore(reducer, enhancer);
