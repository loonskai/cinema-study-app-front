import { LOAD_ALL_SEATS } from './../../constants';

// import api from '../../ApiService';

const loadAllSeats = () => {
  return async (dispatch: any) => {
    const seats = await api.loadAllSeats();
    if (seats) {
      dispatch({ type: LOAD_ALL_SEATS, payload: seats });
    }
  };
};

export default {
  loadAllSeats
};
