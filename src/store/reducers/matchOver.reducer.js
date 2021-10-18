import {MATCH_OVER, SAVE_RESULTS} from '../actionTypes';

const INITIAL_STATE = {
  results: [],
  matchOver: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_RESULTS:
      return {
        ...state,
        results: [...state.results, ...action.data],
      };

    case MATCH_OVER:
      return {
        ...state,
        matchOver: true,
      };

    default:
      return state;
  }
};
