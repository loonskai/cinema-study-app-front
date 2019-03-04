import { combineReducers } from 'redux';

import movies from './movies';
import auth from './auth';

export default combineReducers({
  movies,
  auth
});
