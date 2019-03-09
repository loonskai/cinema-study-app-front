import { TOGGLE_ORDER_CONFIRMATION_MODAL } from './../../constants';

const toggleOrderConfirmationModal = (value: boolean) => {
  return (dispatch: any) => {
    dispatch({ type: TOGGLE_ORDER_CONFIRMATION_MODAL, payload: value });
  };
};

export default {
  toggleOrderConfirmationModal
};
