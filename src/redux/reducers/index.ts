import { combineReducers } from 'redux';

import auth from './auth';
import movies from './movies';
import sessions from './sessions';
import order from './order';

export default combineReducers({
  auth,
  movies,
  sessions,
  order
});
