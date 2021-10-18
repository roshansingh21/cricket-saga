import {NEW_IN_STRIKER, UPDATE_BATTERS, UPDATE_STRIKER} from '../actionTypes';

const INITIAL_STATE = {
  striker: 10,
  nonStriker: 7,
  batters: [
    {
      inAt: 1,
      jerseyNo: 10,
      name: 'Kirat Boli',
      probability: [0.05, 0.3, 0.25, 0.1, 0.15, 0.01, 0.09, 0.05],
      balls: 0,
      runs: 0,
      sr: 0,
      isOut: false,
      isOnPitch: true,
    },
    {
      inAt: 2,
      jerseyNo: 7,
      name: 'N.S. Nodhi',
      probability: [0.1, 0.4, 0.2, 0.05, 0.1, 0.01, 0.04, 0.1],
      balls: 0,
      runs: 0,
      sr: 0,
      isOut: false,
      isOnPitch: true,
    },
    {
      inAt: 3,
      jerseyNo: 11,
      name: 'R. Rumrah',
      probability: [0.2, 0.3, 0.15, 0.05, 0.05, 0.01, 0.04, 0.2],
      balls: 0,
      runs: 0,
      sr: 0,
      isOut: false,
      isOnPitch: false,
    },
    {
      inAt: 4,
      jerseyNo: 9,
      name: 'Sashi Henra',
      probability: [0.3, 0.25, 0.5, 0, 0.05, 0.01, 0.04, 0.3],
      balls: 0,
      runs: 0,
      sr: 0,
      isOut: false,
      isOnPitch: false,
    },
  ],
};

const updateStrikerScore = (state, runs) => {
  const striker = state.batters.filter(
    batter => batter.jerseyNo === state.striker,
  )[0];
  const otherBatters = state.batters.filter(
    batter => batter.jerseyNo !== state.striker,
  );
  striker.balls = striker.balls + 1;
  striker.runs = striker.runs + runs;
  striker.sr = ((striker.runs / striker.balls) * 100).toFixed(0);
  otherBatters.push(striker);
  return otherBatters;
};

const markStrikerOut = state => {
  const striker = state.batters.filter(
    batter => batter.jerseyNo === state.striker,
  )[0];
  const otherBatters = state.batters.filter(
    batter => batter.jerseyNo !== state.striker,
  );
  striker.isOut = true;
  striker.isOnPitch = false;
  otherBatters.push(striker);
  return otherBatters;
};

const getNextBatterIn = state => {
  const nextIn = state.batters.filter(
    batter => !batter.isOut && !batter.isOnPitch,
  )[0].jerseyNo;
  nextIn.isOnPitch = true;
  return nextIn;
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_BATTERS:
      return {
        ...state,
        batters: updateStrikerScore(state, action.data),
      };

    case UPDATE_STRIKER:
      let temp = state.striker;
      return {
        ...state,
        striker: state.nonStriker,
        nonStriker: temp,
      };

    case NEW_IN_STRIKER:
      return {
        ...state,
        batters: markStrikerOut(state),
        striker: getNextBatterIn(state),
      };

    default:
      return state;
  }
};
