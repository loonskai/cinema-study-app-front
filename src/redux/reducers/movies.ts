import { LOAD_MOVIES_LIST } from './../../constants';

const initialState = null;

export default (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_MOVIES_LIST:
      return payload;
    default:
      return state;
  }
};
