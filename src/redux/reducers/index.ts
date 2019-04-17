import { combineReducers } from 'redux';

import { AuthState } from '../reducers/auth';

import { SeatItem } from '../../interfaces/Api';
import Movie from '../../classes/Movie';
import Session from '../../classes/Session';

import auth from './auth';
import movies from './movies';
import sessions from './sessions';
import order from './order';
import seats from './seats';
import cinemas from './cinemas';

export interface ReduxState {
  auth: AuthState;
  movies: Movie[] | null;
  sessions: Session[] | null;
  order: {
    sessionID: number | null;
    hallID: number | null;
    seatsPicked: SeatItem[];
    bonuses: {
      [key: string]: {
        id: number;
        quantity: number;
        price: number;
      };
    } | null;
  };
  seats: null;
  cinemas: null;
}

export default combineReducers({
  auth,
  movies,
  sessions,
  order,
  seats,
  cinemas
});
