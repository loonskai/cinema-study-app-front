import apiService from './Api';

import { SeatItem, OrderAPIType } from '../interfaces/Api';
import Order from '../classes/Order';
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
      await apiService.clearReservation(sessionID, seats);
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
  },

  async getPersonalOrders(stateSetter?: (data: Order[]) => void): Promise<any> {
    try {
      const res = await apiService.getPersonalOrders();
      if (res.error || !res.data) {
        throw Error(res.message);
      }
      const result = res.data.map((order: OrderAPIType) => new Order(order));
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
