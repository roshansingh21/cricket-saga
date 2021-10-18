import {UPDATE_OVER, UPDATE_SUB_OVER} from '../actionTypes';

const INITIAL_STATE = {
  over: 0,
  subOver: 0,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_OVER:
      return {
        over: state.over + 1,
        subOver: 0,
      };
    case UPDATE_SUB_OVER:
      return {
        ...state,
        subOver: state.subOver + 1,
      };
    default:
      return state;
  }
};
