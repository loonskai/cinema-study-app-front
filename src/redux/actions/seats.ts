import { LOAD_ALL_SEATS } from './../../constants';

import sessionService from '../../services/Session';

const loadAllSeats = () => {
  return async (dispatch: any) => {
    const sessions = await sessionService.getAll({});
    const seatsData =
      sessions &&
      sessions.map(session => ({
        sessionID: session.id,
        hallID: session.hallID,
        rows: session.rows.sort((row1, row2) => +row1.id - +row2.id)
      }));
    if (seatsData) {
      dispatch({ type: LOAD_ALL_SEATS, payload: seatsData });
    }
  };
};

export default {
  loadAllSeats
};
