import { LOAD_MOVIES_LIST } from './../../constants';
import ApiService from './../../ApiService';

const api = new ApiService();

const loadMoviesList = () => {
  try {
    return async (dispatch: any) => {
      const res = await api.loadMoviesList();
      console.log('inside action ---', res);
    };
  } catch (error) {
    console.log(error);
  }
};

export default {
  loadMoviesList
};
