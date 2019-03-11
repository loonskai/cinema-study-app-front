import { SET_ORDER_INFO } from './../../constants';

const initialState = {
  sessionId: null,
  hallId: null,
  seatsPicked: [],
  totalPrice: 0
};

export default (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ORDER_INFO:
      return payload;
    default:
      return state;
  }
};
