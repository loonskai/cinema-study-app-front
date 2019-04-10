import { LOAD_ALL_SEATS } from './../../constants';

import hallService from '../../services/Hall';
import sessionService from '../../services/Session';

const loadAllSeats = () => {
  return async (dispatch: any) => {
    // const halls = await hallService.getAll();
    const sessions = await sessionService.getAll({});
    console.log(sessions);
    sessions && sessions.map(session => console.log(session.rows));
    // if (seats) {
    //   dispatch({ type: LOAD_ALL_SEATS, payload: seats });
    // }
  };
};

export default {
  loadAllSeats
};
