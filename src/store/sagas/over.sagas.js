import {fork, put, select, all, takeLatest} from '@redux-saga/core/effects';
import {matchOver, saveResults} from '../actions';
import {updateStricker} from '../actions/batters.action';
import {updateOver, updateSubOver} from '../actions/over.action';
import {WATCHER_OVER} from '../actionTypes';

function* getOverEffect() {
  const prevState = yield select(state => state.over);
  if (prevState.subOver < 5) {
    yield put(updateSubOver());
  } else if (prevState.over === 3 && prevState.subOver === 5) {
    const prevStateBatters = yield select(state => state.batters.batters);
    yield all([
      put(updateOver()),
      put(updateStricker()),
      put(saveResults(prevStateBatters)),
      put(matchOver()),
    ]);
  } else {
    yield all([put(updateOver()), put(updateStricker())]);
  }
}

function* watchOver() {
  yield takeLatest(WATCHER_OVER, getOverEffect);
}

const overSagas = [fork(watchOver)];

export default overSagas;
