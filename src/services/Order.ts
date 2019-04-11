import apiService from './Api';

import { SeatItem } from '../interfaces/Api';
import { parseErrorMessage } from '../helpers/parseResponse';
import defineErrorField from '../helpers/defineErrorField';

export default {
  async toggleReservation(sessionID: number, item: SeatItem): Promise<boolean> {
    try {
      const res = await apiService.toggleReservation(sessionID, item);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
};
