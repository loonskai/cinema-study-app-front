import { SET_ORDER_INFO } from './../../constants';

import { OrderReduxType } from '../../interfaces/Api';

const setOrderInfo = (order: OrderReduxType) => {
  return async (dispatch: any) => {
    dispatch({ type: SET_ORDER_INFO, payload: order });
  };
};

export default {
  setOrderInfo
};
