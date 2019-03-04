import { combineReducers } from 'redux';

import auth from './auth';
import movies from './movies';
import sessions from './sessions';

export default combineReducers({
  auth,
  movies,
  sessions
});
