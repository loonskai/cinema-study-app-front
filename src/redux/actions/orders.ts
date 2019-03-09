import { SET_ORDER_INFO, CLEAR_ORDER_INFO } from './../../constants';

const setOrderInfo = (order: boolean) => {
  return (dispatch: any) => {
    dispatch({ type: SET_ORDER_INFO, payload: order });
  };
};

const clearOrderInfo = () => {
  return (dispatch: any) => {
    dispatch({ type: CLEAR_ORDER_INFO });
  };
};

export default {
  setOrderInfo,
  clearOrderInfo
};
