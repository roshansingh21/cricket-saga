import {NEW_IN_STRIKER, UPDATE_BATTERS, UPDATE_STRIKER} from '../actionTypes';

export const updateBatters = data => ({
  type: UPDATE_BATTERS,
  data,
});

export const updateStricker = () => ({
  type: UPDATE_STRIKER,
});

export const newInStriker = () => ({
  type: NEW_IN_STRIKER,
});
