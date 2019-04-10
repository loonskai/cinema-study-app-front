import { LOAD_ALL_SEATS } from './../../constants';

import sessionService from '../../services/Session';

const loadAllSeats = () => {
  return async (dispatch: any) => {
    const sessions = await sessionService.getAll({});
    const seatsData =
      sessions &&
      sessions.map(session => ({
        hallID: session.hallID,
        rows: session.rows.reverse()
      }));
    if (seatsData) {
      dispatch({ type: LOAD_ALL_SEATS, payload: seatsData });
    }
  };
};

export default {
  loadAllSeats
};
