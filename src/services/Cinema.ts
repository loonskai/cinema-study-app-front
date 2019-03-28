import apiService from './Api';
import Cinema from '../classes/Cinema';

import { ResType, CinemaAPIType } from '../interfaces/Api';
import { parseErrorMessage } from '../helpers/parseResponse';
import defineErrorField from '../helpers/defineErrorField';

export default {
  async create(
    data: CinemaAPIType,
    errorsSetter: any
  ): Promise<ResType<string>> {
    try {
      const res = await apiService.createCinema(data);
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
    stateSetter?: (data: Cinema[]) => void
  ): Promise<Cinema[] | null> {
    try {
      const res = await apiService.getCinemas();
      if (res.error || !res.data) {
        throw Error(res.message);
      }
      const result = res.data.map((movie: CinemaAPIType) => new Cinema(movie));
      if (stateSetter) {
        stateSetter(result);
      }
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
};
