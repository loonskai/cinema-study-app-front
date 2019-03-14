import { LOAD_CINEMAS } from './../../constants';
import api from './../../ApiService';

const loadAllCinemas = () => {
  try {
    return async (dispatch: any) => {
      const data = await api.loadAllCinemas();
      dispatch({ type: LOAD_CINEMAS, payload: data });
    };
  } catch (error) {
    console.log(error);
  }
};

const loadCinemasByCity = (city: string) => {
  try {
    return async (dispatch: any) => {
      const data = await api.loadCinemasByCity(city);
      dispatch({ type: LOAD_CINEMAS, payload: data });
    };
  } catch (error) {
    console.log(error);
  }
};

export default {
  loadCinemasByCity,
  loadAllCinemas
};
