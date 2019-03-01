import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducer from './reducers/index';

const composeEnhancers =
  typeof window === 'object' &&
  (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = compose(applyMiddleware(thunk, logger));

export default createStore(reducer, enhancer);
