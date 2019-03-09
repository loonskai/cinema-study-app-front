import { SET_ORDER_INFO } from './../../constants';

const setOrderInfo = (order: boolean) => {
  return (dispatch: any) => {
    dispatch({ type: SET_ORDER_INFO, payload: order });
  };
};

export default {
  setOrderInfo
};
