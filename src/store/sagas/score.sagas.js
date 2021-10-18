import {fork, takeLatest, select, put, all} from 'redux-saga/effects';
import {
  matchOver,
  saveResults,
  updateBatters,
  updateRuns,
  updateScore,
  updateStricker,
  watchWickets,
} from '../actions';
import {watchOver} from '../actions/over.action';
import {WATCHER_SCORE} from '../actionTypes';

function* getScoreEffect(action) {
  yield all([
    put(watchOver()),
    put(updateRuns(action.data !== -1 ? action.data : 0)),
    put(updateScore(action.data !== -1 ? action.data : 0)),
    put(updateBatters(action.data !== -1 ? action.data : 0)),
  ]);

  if (action.data === 1 || action.data === 3 || action.data === 5) {
    yield put(updateStricker());
  } else if (action.data === -1) {
    yield put(watchWickets());
  }
  const totalScore = yield select(state => state.score.score);
  if (totalScore >= 40) {
    const prevStateBatters = yield select(state => state.batters.batters);
    yield all([put(saveResults(prevStateBatters)), put(matchOver())]);
  }
}

function* watchScore() {
  yield takeLatest(WATCHER_SCORE, getScoreEffect);
}

const scoreSagas = [fork(watchScore)];

export default scoreSagas;
