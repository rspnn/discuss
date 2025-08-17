/*
 * Skenario: Testing the authUserReducer
 * * - Should return initial state when given unknown action
 * * - Should set authUser when given SET_AUTH_USER action
 * * * - Should unset authUser when given UNSET_AUTH_USER action
 * */

import { describe, it, expect } from 'vitest';
import authUserReducer from './reducer';
import { ActionType } from './action';

describe('authUserReducer', () => {
  it('should return initial state when given unknown action', () => {
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should set authUser when given SET_AUTH_USER action', () => {
    const initialState = null;
    const fakeUser = { id: 'user-1', name: 'John Doe' };

    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: { authUser: fakeUser },
    };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(fakeUser);
  });

  it('should unset authUser when given UNSET_AUTH_USER action', () => {
    const initialState = { id: 'user-1', name: 'John Doe' };

    const action = {
      type: ActionType.UNSET_AUTH_USER,
      payload: { authUser: null },
    };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toBeNull();
  });
});
