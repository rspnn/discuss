const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREADS: 'ADD_THREADS',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadsActionCreator(threads) {
  return {
    type: ActionType.ADD_THREADS,
    payload: {
      threads,
    },
  };
}

import api from '../../utils/api';
import { hideLoading, showLoading } from '../loadingBar/action';

function asyncAddThread({ title, category, body }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.addThread({ title, category, body });
      dispatch(addThreadsActionCreator([thread]));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadsActionCreator,
  asyncAddThread,
};
