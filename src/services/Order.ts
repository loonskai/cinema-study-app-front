import apiService from './Api';

import { SeatItem } from '../interfaces/Api';
import { parseErrorMessage } from '../helpers/parseResponse';
import defineErrorField from '../helpers/defineErrorField';

export interface OrderAPIType {
  sessionID: number;
  seats: SeatItem[];
  bonuses: {
    id: number;
    quantity: number;
  };
}

export default {
  async toggleReservation(sessionID: number, item: SeatItem): Promise<boolean> {
    try {
      const res = await apiService.toggleReservation(sessionID, item);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  async clearReservation(
    sessionID: number,
    seats: Array<{ row: number; seat: number }>
  ) {
    try {
      const res = await apiService.clearReservation(sessionID, seats);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  async create(order: OrderAPIType): Promise<any> {
    try {
      const res = await apiService.createOrder(order);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
};
