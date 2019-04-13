import { SIGN_IN, SIGN_OUT } from './../../constants';
import authService from '../../services/Auth';
import { UserAPIType } from '../../interfaces/Api';

const signIn = (data: UserAPIType): any => {
  try {
    return async (dispatch: any) => {
      const { role, userID } = data;
      dispatch({
        type: SIGN_IN,
        payload: {
          userID,
          isAdmin: role === 'admin'
        }
      });
      return true;
    };
  } catch (error) {
    console.log(error);
  }
};

const signOut = () => {
  try {
    return async (dispatch: any) => {
      await authService.signOut();
      dispatch({ type: SIGN_OUT });
      return true;
    };
  } catch (error) {
    console.log(error);
  }
};

const validateToken = (token: string) => {
  try {
    return async (dispatch: any) => {
      const userData = await authService.validateToken(token);
      if (userData) {
        dispatch({
          type: SIGN_IN,
          payload: {
            userID: userData.userID,
            isAuth: true,
            isAdmin: userData.role === 'admin'
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
