import { LOAD_MOVIES_LIST } from './../../constants';
// import api from './../../ApiService';
import movieService from '../../services/Movie';

import { ResType, MovieAPIType } from '../../interfaces/Api';

const loadMoviesList = () => {
  try {
    return async (dispatch: any) => {
      const res = await movieService.getAll();
      if (res) {
        dispatch({ type: LOAD_MOVIES_LIST, payload: res });
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export default {
  loadMoviesList
};
