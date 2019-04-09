import { ResType } from '../interfaces/Api';
import { parseErrorMessage } from '../helpers/parseResponse';
import defineErrorField from '../helpers/defineErrorField';
import apiService from './Api';

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
  }
};
