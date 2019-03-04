import { SIGN_IN, SIGN_UP, SIGN_OUT } from './../../constants';

const initialState = {
  token: null
};

export default (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case SIGN_IN:
      return payload;
    default:
      return state;
  }
};
