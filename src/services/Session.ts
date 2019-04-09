import { ResType } from '../interfaces/Api';
import { parseErrorMessage } from '../helpers/parseResponse';
import defineErrorField from '../helpers/defineErrorField';
import apiService from './Api';
import Session from '../classes/Session';

export interface SessionCreateType {
  date: Date;
  time: string;
  movie: string;
  hall: string | number;
}

export default {
  async create(
    data: SessionCreateType,
    errorsSetter?: any
  ): Promise<ResType<string>> {
    try {
      data.hall = +data.hall;
      const res = await apiService.createSession(data);
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

  async getAll(
    stateSetter?: (data: Session[]) => void
  ): Promise<Session[] | null> {
    try {
      const res = await apiService.getSessions();
      if (res.error || !res.data) {
        throw Error(res.message);
      }
      const result = res.data.map(session => new Session(session));
      if (stateSetter) {
        stateSetter(result);
      }
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
};
