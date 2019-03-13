import { SIGN_IN, SIGN_UP, SIGN_OUT } from './../../constants';

const initialState = {
  isAuth: false,
  isAdmin: false
};

export default (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case SIGN_IN:
      return { isAuth: true, isAdmin: payload.isAdmin };
    case SIGN_OUT:
      return { isAuth: false, isAdmin: false };
    default:
      return state;
  }
};
