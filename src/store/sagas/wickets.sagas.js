import {all, fork, put, select, takeLatest} from '@redux-saga/core/effects';
import {matchOver, newInStriker, saveResults, updateWickets} from '../actions';
import {WATCHER_WICKETS} from '../actionTypes';

function* getWicketsEffect() {
  const prevStateWickets = yield select(state => state.wickets.wickets);
  if (prevStateWickets < 2) {
    yield all([put(updateWickets()), put(newInStriker())]);
  } else {
    const prevStateBatters = yield select(state => state.batters.batters);
    yield all([
      put(updateWickets()),
      put(saveResults(prevStateBatters)),
      put(matchOver()),
    ]);
  }
}

function* watchWickets() {
  yield takeLatest(WATCHER_WICKETS, getWicketsEffect);
}

const wicketSagas = [fork(watchWickets)];

export default wicketSagas;
