import {UPDATE_SCORE, WATCHER_SCORE} from '../actionTypes';

export const watcherScore = data => ({
  type: WATCHER_SCORE,
  data,
});

export const updateScore = data => ({
  type: UPDATE_SCORE,
  data,
});
