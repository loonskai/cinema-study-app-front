import apiService from './Api';
import Cinema from '../classes/Cinema';

import { CinemaAPIType } from '../interfaces/Api';
import { parseErrorMessage } from '../helpers/parseResponse';
import defineErrorField from '../helpers/defineErrorField';

export default {
  async create(
    data: CinemaAPIType,
    errorsSetter: any
  ): Promise<string | undefined> {
    try {
      const res = await apiService.createCinema(data);
      return res.data;
    } catch (error) {
      console.dir(error);
      const message = parseErrorMessage(error);
      const fields = defineErrorField(message);
      console.log(fields);
      return typeof fields === 'object'
        ? errorsSetter(fields)
        : errorsSetter({ [fields]: message });
    }
  }
};
