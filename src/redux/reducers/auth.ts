import { SIGN_IN, SIGN_OUT } from './../../constants';

export interface AuthState {
  isAuth: boolean;
  isAdmin: boolean;
  userID: number | null;
  userName: string | null;
}

export interface SignInAction {
  type: typeof SIGN_IN;
  payload: {
    isAuth: boolean;
    isAdmin: boolean;
    userID: number;
    username: string;
  };
}

export interface SignOutAction {
  type: typeof SIGN_OUT;
  payload: undefined;
}

type AuthActionType = SignInAction | SignOutAction;

const initialState: AuthState = {
  isAuth: false,
  isAdmin: false,
  userID: null,
  userName: null
};

export default (state = initialState, action: AuthActionType): AuthState => {
  const { type, payload } = action;

  switch (type) {
    case SIGN_IN:
      return payload
        ? {
            isAuth: true,
            isAdmin: payload.isAdmin,
            userID: payload.userID,
            userName: payload.username
          }
        : state;
    case SIGN_OUT:
      return {
        isAuth: false,
        isAdmin: false,
        userID: null,
        userName: null
      };
    default:
      return state;
  }
};
