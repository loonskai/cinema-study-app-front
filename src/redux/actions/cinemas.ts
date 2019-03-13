import { LOAD_CINEMAS_BY_CITY } from './../../constants';
import api from './../../ApiService';

const loadCinemasByCity = (city: string) => {
  try {
    return async (dispatch: any) => {
      const data = await api.loadCinemasByCity(city);
      dispatch({ type: LOAD_CINEMAS_BY_CITY, payload: data });
    };
  } catch (error) {
    console.log(error);
  }
};

export default {
  loadCinemasByCity
};
