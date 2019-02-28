import { LOAD_MOVIES_LIST } from './../../constants';

const initialState = {
  movies: []
};

export default (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_MOVIES_LIST:
      return { movies: payload };
    default:
      return state;
  }
};
