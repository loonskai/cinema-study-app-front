import { SIGN_IN, SIGN_UP, SIGN_OUT } from './../../constants';
import api from './../../ApiService';

const signIn = (values: any) => {
  try {
    return async (dispatch: any) => {
      const token = await api.signIn(values);
      if (!token) throw new Error('cannot get token from api service');
      dispatch({ type: SIGN_IN, payload: true });
      sessionStorage.setItem('token', token.toString());
    };
  } catch (error) {
    console.log(error);
  }
};

const signOut = () => {
  try {
    return async (dispatch: any) => {
      await api.signOut();
      dispatch({ type: SIGN_OUT });
      sessionStorage.removeItem('token');
    };
  } catch (error) {
    console.log(error);
  }
};

const signUp = () => {};

export default {
  signIn,
  signUp,
  signOut
};
