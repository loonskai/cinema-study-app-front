import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../reducers/index';
import { SignInAction, SignOutAction } from '../reducers/auth';
import { UserAPIType } from '../../interfaces/Api';

import { SIGN_IN, SIGN_OUT } from './../../constants';
import authService from '../../services/Auth';

const signIn = (
  data: UserAPIType
): ThunkAction<void, AppState, null, SignInAction> | undefined => {
  try {
    return async (dispatch: Dispatch<SignInAction>): Promise<boolean> => {
      const { userID, username, role } = data;
      dispatch({
        type: SIGN_IN,
        payload: {
          isAuth: true,
          isAdmin: role === 'admin',
          userID,
          username
        }
      });
      return true;
    };
  } catch (error) {
    console.log(error);
  }
};

const signOut = ():
  | ThunkAction<void, AppState, null, SignOutAction>
  | undefined => {
  try {
    return async (dispatch: Dispatch<SignOutAction>): Promise<boolean> => {
      await authService.signOut();
      dispatch({ type: SIGN_OUT });
      return true;
    };
  } catch (error) {
    console.log(error);
  }
};

const validateToken = (
  token: string
): ThunkAction<void, AppState, null, SignInAction> | undefined => {
  try {
    return async (dispatch: Dispatch<SignInAction>): Promise<void> => {
      const userData = await authService.validateToken(token);
      if (userData) {
        dispatch({
          type: SIGN_IN,
          payload: {
            isAuth: true,
            isAdmin: userData.role === 'admin',
            userID: userData.userID,
            username: userData.userName
          }
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export default {
  signIn,
  signOut,
  validateToken
};
