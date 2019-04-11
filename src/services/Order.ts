import apiService from './Api';

import { SeatItem } from '../interfaces/Api';
import { parseErrorMessage } from '../helpers/parseResponse';
import defineErrorField from '../helpers/defineErrorField';

export default {
  async reserve(item: SeatItem, toReserve: boolean): Promise<boolean> {
    try {
      let res;
      if (toReserve) {
        res = await apiService.reserveSeat(item);
      } else {
        res = await apiService.cancelReserveSeat(item);
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
};
