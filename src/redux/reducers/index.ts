import { combineReducers } from 'redux';

import auth from './auth';
import movies from './movies';
import sessions from './sessions';
import order from './order';
import seats from './seats';
import cinemas from './cinemas';

export default combineReducers({
  auth,
  movies,
  sessions,
  order,
  seats,
  cinemas
});
