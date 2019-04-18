import { LOAD_CINEMAS } from './../../constants';

const initialState = null;

export default (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_CINEMAS:
      return payload;
    default:
      return state;
  }
};
