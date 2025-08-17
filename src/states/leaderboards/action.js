import { showLoading, hideLoading } from '../loadingBar/action';
const actionTypes = {
  RECEIVE_LEADERBOARD: 'RECEIVE_LEADERBOARD',
};

const receiveLeaderboardActionCreator = (leaderboard) => {
  return {
    type: actionTypes.RECEIVE_LEADERBOARD,
    payload: {
      leaderboard,
    },
  };
};

import api from '../../utils/api';

function asyncReceiveLeaderboard() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const leaderboard = await api.getLeaderboard();
      dispatch(receiveLeaderboardActionCreator(leaderboard));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  actionTypes,
  receiveLeaderboardActionCreator,
  asyncReceiveLeaderboard,
};
