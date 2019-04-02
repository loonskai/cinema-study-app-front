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
      const result = res.data.map(
        (cinema: CinemaAPIType) => new Cinema(cinema)
      );
      if (stateSetter) {
        stateSetter(result);
      }
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  async update(id: number, values: CinemaAPIType): Promise<ResType<Cinema>> {
    try {
      const { title, city } = values;
      if (!id) {
        throw Error('Cinema ID not defined');
      }
      if (!title || !city) {
        throw Error('Invalid values');
      }
      const { data } = await apiService.updateCinema(id, { title, city });
      const updatedCinema = new Cinema(data);
      return {
        success: true,
        data: updatedCinema
      };
    } catch (error) {
      console.error(error);
      return {
        error: true,
        message: error.message
      };
    }
  },

  async delete(id: number): Promise<boolean | null> {
    try {
      if (!id) {
        throw Error('Cinema ID not defined');
      }
      await apiService.deleteCinema(id);
      return true;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
};
