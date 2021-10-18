import {UPDATE_WICKETS} from '../actionTypes';

const INITIAL_STATE = {
  wickets: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_WICKETS:
      return {
        wickets: state.wickets + 1,
      };

    default:
      return state;
  }
};
