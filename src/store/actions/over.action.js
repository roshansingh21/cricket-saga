import {UPDATE_OVER, UPDATE_SUB_OVER, WATCHER_OVER} from '../actionTypes';

export const updateOver = () => ({
  type: UPDATE_OVER,
});

export const updateSubOver = () => ({
  type: UPDATE_SUB_OVER,
});

export const watchOver = () => ({
  type: WATCHER_OVER,
});
