import movies from './movies';
import auth from './auth';
import sessions from './sessions';

export default {
  ...auth,
  ...movies,
  ...sessions
};
