import { SET_ORDER_INFO } from './../../constants';

// import api from '../../ApiService';

const setOrderInfo = (order: boolean) => {
  return (dispatch: any) => {
    const result = api.reserve(order);
    if (result) {
      dispatch({ type: SET_ORDER_INFO, payload: order });
    }
  };
};

export default {
  setOrderInfo
};
