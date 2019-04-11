import { SET_ORDER_INFO } from './../../constants';

import { OrderType } from '../../interfaces/Api';

const setOrderInfo = (order: OrderType) => {
  return async (dispatch: any) => {
    dispatch({ type: SET_ORDER_INFO, payload: order });
  };
};

export default {
  setOrderInfo
};
