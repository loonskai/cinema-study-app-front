import apiService from './Api';
import Hall from '../classes/Hall';

import { ResType, HallAPIType } from '../interfaces/Api';
import { parseErrorMessage } from '../helpers/parseResponse';
import defineErrorField from '../helpers/defineErrorField';

export interface HallCreateType {
  title: string;
  cinemaID: string | number;
  rows: Array<{
    quantity: number | string;
    category: number | string;
    lastInSection: boolean;
  }>;
}

export default {
  async create(
    data: HallCreateType,
    errorsSetter?: any
  ): Promise<ResType<string>> {
    try {
      data.cinemaID = +data.cinemaID;
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
  },

  async getAll(stateSetter?: (data: Hall[]) => void): Promise<Hall[] | null> {
    try {
      const res = await apiService.getHalls();
      if (res.error || !res.data) {
        throw Error(res.message);
      }
      const result = res.data.map((hall: HallAPIType) => new Hall(hall));
      console.log(result);
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
