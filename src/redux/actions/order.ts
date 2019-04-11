import { SET_ORDER_INFO } from './../../constants';

import orderService from '../../services/Order';

import { OrderType } from '../../interfaces/Api';

const setOrderInfo = (order: OrderType) => {
  return async (dispatch: any) => {
    /* const reserveResult = await orderService.reserve(
      order,
      true */ /* CHECK IF SEAT EXIST IN ORDER PICKED SEATS */
    /* );
    if (reserveResult) {
      dispatch({ type: SET_ORDER_INFO, payload: order });
    } */
    console.log(order);
    dispatch({ type: SET_ORDER_INFO, payload: order });
  };
};

export default {
  setOrderInfo
};
