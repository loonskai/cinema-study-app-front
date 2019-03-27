import apiService from './Api';
import { SignInBodyType, SignUpBodyType } from '../interfaces/Auth';
import { parseErrorMessage } from '../helpers/parseResponse';
import defineErrorField from '../helpers/defineErrorField';

export default {
  async signUp(body: SignUpBodyType, errorsSetter: any): Promise<any> {
    try {
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
      return res.data;
    } catch (error) {
      console.error(error);
      const message = parseErrorMessage(error);
      const fields = defineErrorField(message);
      return typeof fields === 'object'
        ? errorsSetter(fields)
        : errorsSetter({ [fields]: message });
    }
  },

  async signIn(body: SignInBodyType, errorsSetter: any): Promise<any> {
    try {
      const { data } = await apiService.signIn(body);
      if (!data || !data.token) {
        throw Error('Unable to parse token data');
      }
      sessionStorage.setItem('accessToken', data.token);
      return data;
    } catch (error) {
      console.error(error);
      const message = parseErrorMessage(error);
      const fields = defineErrorField(message);
      return typeof fields === 'object'
        ? errorsSetter(fields)
        : errorsSetter({ [fields]: message });
    }
  },

  async signOut() {
    sessionStorage.removeItem('accessToken');
  },

  async validateToken(token: string): Promise<any> {
    const res = await apiService.validateToken(token);
    if (res.error) {
      sessionStorage.removeItem('accessToken');
      return;
    }
    return res.data;
  }
};
