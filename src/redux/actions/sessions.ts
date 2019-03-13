import { LOAD_SESSIONS_LIST } from './../../constants';
import api from './../../ApiService';

const loadSessionsList = (options: any) => {
  try {
    return async (dispatch: any) => {
      const data = await api.loadSessionsList(options);
      dispatch({ type: LOAD_SESSIONS_LIST, payload: data });
    };
  } catch (error) {
    console.log(error);
  }
};

export default {
  loadSessionsList
};
