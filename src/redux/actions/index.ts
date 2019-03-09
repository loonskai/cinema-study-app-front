import movies from './movies';
import auth from './auth';
import sessions from './sessions';
import modals from './modals';

export default {
  ...auth,
  ...movies,
  ...sessions,
  ...modals
};
