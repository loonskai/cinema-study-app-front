import movies from './movies';
import auth from './auth';
import sessions from './sessions';
import order from './order';
import seats from './seats';
import cinemas from './cinemas';

export default {
  ...auth,
  ...movies,
  ...sessions,
  ...order,
  ...seats,
  ...cinemas
};
