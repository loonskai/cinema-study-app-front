import { combineReducers } from 'redux';

import auth from './auth';
import movies from './movies';
import sessions from './sessions';
import modals from './modals';

export default combineReducers({
  auth,
  movies,
  sessions,
  modals
});
