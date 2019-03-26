import apiService from './Api';
import parseResponse from '../helpers/parseResponse';
import { SignInBodyType, SignUpBodyType } from '../interfaces/Auth';

export default {
  async signIn(body: SignInBodyType, errorsSetter: any): Promise<any> {
    const res = await apiService.signIn(body);
    if (res.error) {
      return errorsSetter({
        email: res.message,
        username: res.message
      });
    }
    return res.data;
  },

  async signUp(body: SignUpBodyType, errorsSetter: any): Promise<any> {
    const { password, confirmPassword } = body;
    if (password.length < 8) {
      return errorsSetter({
        password: 'Password should have min 8 characters length'
      });
    }
    if (password !== confirmPassword) {
      return errorsSetter({
        confirmPassword: 'Passwords do not match'
      });
    }

    const res = await apiService.signUp(body);
    if (res.error) {
      return errorsSetter({
        email: res.message,
        username: res.message
      });
    }
    return res.data;
  },

  async signOut() {},

  async validateToken(token: string): Promise<any> {
    const res = await apiService.validateToken(token);
    if (res.error) {
      sessionStorage.removeItem('accessToken');
      return;
    }
    return res.data;
  }
};
