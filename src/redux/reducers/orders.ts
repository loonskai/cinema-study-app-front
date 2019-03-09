import { SET_ORDER_INFO, CLEAR_ORDER_INFO } from './../../constants';

const initialState = {
  data: {
    sessionId: null,
    seatsPicked: [],
    totalPrice: 0
  }
};

export default (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ORDER_INFO:
      return { data: payload };
    case CLEAR_ORDER_INFO:
      return {
        data: {
          sessionId: null,
          seatsPicked: [],
          totalPrice: 0
        }
      };
    default:
      return state;
  }
};
