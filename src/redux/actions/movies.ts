import { LOAD_MOVIES_LIST } from './../../constants';
import api from './../../ApiService';

const loadMoviesList = () => {
  try {
    return async (dispatch: any) => {
      const data = await api.loadMoviesList();
      dispatch({ type: LOAD_MOVIES_LIST, payload: data });
    };
  } catch (error) {
    console.log(error);
  }
};

export default {
  loadMoviesList
};
