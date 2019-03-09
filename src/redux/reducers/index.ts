import { combineReducers } from 'redux';

import auth from './auth';
import movies from './movies';
import sessions from './sessions';
import modals from './modals';
import orders from './orders';

export default combineReducers({
  auth,
  movies,
  sessions,
  modals,
  orders
});
