import { LOAD_ALL_SEATS } from './../../constants';

const initialState = null;

export default (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_ALL_SEATS:
      return payload;
    default:
      return state;
  }
};
