import apiService from './Api';
import Hall from '../classes/Hall';

import { ResType, HallAPIType } from '../interfaces/Api';
import { parseErrorMessage } from '../helpers/parseResponse';
import defineErrorField from '../helpers/defineErrorField';

export default {
  async create(data: HallAPIType, errorsSetter?: any): Promise<void> {
    try {
      data.rows = data.rows.map(row => ({
        quantity: +row.quantity,
        category: +row.category,
        lastInSection: !!row.lastInSection
      }));
      const res = await apiService.createHall(data);
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
