import { TOGGLE_ORDER_CONFIRMATION_MODAL } from './../../constants';

const initialState = {
  orderModalDisplayed: false
};

export default (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case TOGGLE_ORDER_CONFIRMATION_MODAL:
      return { orderModalDisplayed: payload };
    default:
      return state;
  }
};
