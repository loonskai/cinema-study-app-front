import { SIGN_IN, SIGN_UP, SIGN_OUT } from './../../constants';

const initialState = {
  isAuth: false,
  isAdmin: false,
  userID: null,
  userName: null
};

export default (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case SIGN_IN:
      return {
        isAuth: true,
        isAdmin: payload.isAdmin,
        userID: payload.userID,
        userName: payload.userName
      };
    case SIGN_OUT:
      return { isAuth: false, isAdmin: false, userID: null, userName: null };
    default:
      return state;
  }
};
