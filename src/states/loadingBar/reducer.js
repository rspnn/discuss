import { ActionType } from './action';

function loadingBarReducer(state = false, action = {}) {
  switch (action.type) {
  case ActionType.SHOW_LOADING:
    return true;
  case ActionType.HIDE_LOADING:
    return false;
  default:
    return state;
  }
}

export default loadingBarReducer;
