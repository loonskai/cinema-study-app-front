import { LOAD_SESSIONS_LIST } from './../../constants';
import sessionService from '../../services/Session';

const loadSessionsList = (options: any) => {
  try {
    return async (dispatch: any) => {
      const data = await sessionService.getAll(options);
      dispatch({ type: LOAD_SESSIONS_LIST, payload: data });
    };
  } catch (error) {
    console.log(error);
  }
};

export default {
  loadSessionsList
};
