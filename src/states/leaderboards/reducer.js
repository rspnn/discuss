import { actionTypes } from './action';

function leaderboardsReducer(state = [], action) {
  switch (action.type) {
  case actionTypes.RECEIVE_LEADERBOARD:
    return action.payload.leaderboard;
  default:
    return state;
  }
}

export default leaderboardsReducer;
