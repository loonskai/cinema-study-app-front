import movies from './movies';
import auth from './auth';
import sessions from './sessions';
import modals from './modals';
import orders from './orders';

export default {
  ...auth,
  ...movies,
  ...sessions,
  ...modals,
  ...orders
};
