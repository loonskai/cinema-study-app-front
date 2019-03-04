import { SIGN_IN, SIGN_UP, SIGN_OUT } from './../../constants';

const initialState = {
  isAuth: false
};

export default (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case SIGN_IN:
      return { isAuth: true };
    default:
      return state;
  }
};
