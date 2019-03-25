import apiService from './Api';

import { SignInBodyType, SignUpBodyType } from '../interfaces/Auth';

export default {
  async signIn(body: SignInBodyType): Promise<any> {
    try {
      const res = await apiService.signIn(body);
    } catch (error) {}
  },

  async signUp(body: any) {},

  async signOut() {}
};
