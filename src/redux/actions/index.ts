import movies from './movies';
import auth from './auth';
import sessions from './sessions';
import order from './order';
import seats from './seats';

export default {
  ...auth,
  ...movies,
  ...sessions,
  ...order,
  ...seats
};
