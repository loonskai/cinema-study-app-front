import { LOAD_MOVIES_LIST } from './../../constants';

const initialState = {
  data: []
};

export default (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_MOVIES_LIST:
      return { data: payload };
    default:
      return state;
  }
};
