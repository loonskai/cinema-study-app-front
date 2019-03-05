import { LOAD_SESSIONS_LIST } from './../../constants';

import { sessions } from './../../mocks';

const initialState = {
  data: [] // empty array default
};

export default (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_SESSIONS_LIST:
      return { data: payload };
    default:
      return state;
  }
};
