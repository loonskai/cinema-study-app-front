import { SET_ORDER_INFO } from './../../constants';

const initialState = {
  data: null
};

export default (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ORDER_INFO:
      return { data: payload };
    default:
      return state;
  }
};
