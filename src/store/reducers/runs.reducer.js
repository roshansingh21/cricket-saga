import {UPDATE_RUN} from '../actionTypes';

const INITIAL_STATE = {
  runs: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_RUN:
      return {
        runs:
          action.data === -1
            ? 'Wicket'
            : action.data === 0
            ? 'Dot Ball'
            : action.data === 1
            ? `${String(action.data)} run`
            : `${String(action.data)} runs`,
      };

    default:
      return state;
  }
};
