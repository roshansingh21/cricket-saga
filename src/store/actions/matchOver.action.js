import {MATCH_OVER, SAVE_RESULTS} from '../actionTypes';

export const matchOver = () => ({
  type: MATCH_OVER,
});

export const saveResults = data => ({
  type: SAVE_RESULTS,
  data,
});
