import {combineReducers} from 'redux';
import score from './score.reducer';
import runs from './runs.reducer';
import over from './over.reducer';
import batters from './batters.reducer';
import wickets from './wickets.reducer';
import matchOver from './matchOver.reducer';

const appReducer = combineReducers({
  score,
  runs,
  over,
  batters,
  wickets,
  matchOver,
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_MATCH') {
    state = undefined;
  }
  return appReducer(state, action);
};
export default rootReducer;
