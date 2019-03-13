import { LOAD_SESSIONS_LIST } from './../../constants';

const initialState = null;

export default (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_SESSIONS_LIST:
      return payload;
    default:
      return state;
  }
};
