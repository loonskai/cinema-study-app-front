import movies from './movies';
import auth from './auth';
import sessions from './sessions';
import order from './order';

export default {
  ...auth,
  ...movies,
  ...sessions,
  ...order
};
