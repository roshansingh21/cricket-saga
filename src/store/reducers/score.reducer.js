import {UPDATE_SCORE} from '../actionTypes';

const INITIAL_STATE = {
  score: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_SCORE:
      if (action.data > 0) {
        return {
          ...state,
          score: state.score + action.data,
        };
      } else {
        return state;
      }

    default:
      return state;
  }
};
