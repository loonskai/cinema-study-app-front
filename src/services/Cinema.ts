import apiService from './Api';
import Cinema from '../classes/Cinema';

import { CinemaAPIType } from '../interfaces/Api';

export default {
  async create(data: CinemaAPIType): Promise<boolean | undefined> {
    try {
      const res = await apiService.createCinema(data);
      if (res.error || !res.data) {
        throw Error(res.message);
      }
      return true;
    } catch (error) {
      console.error(error);
    }
  }
};
