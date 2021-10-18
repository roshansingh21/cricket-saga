import {all} from 'redux-saga/effects';
import ScoreSagas from './score.sagas';
import OverSagas from './over.sagas';
import WicketsSagas from './wickets.sagas';

export default function* rootSaga() {
  yield all([...ScoreSagas, ...OverSagas, ...WicketsSagas]);
}
