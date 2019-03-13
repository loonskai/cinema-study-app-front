import { LOAD_CINEMAS_BY_CITY } from './../../constants';

const initialState = null;

export default (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_CINEMAS_BY_CITY:
      return payload;
    default:
      return state;
  }
};
