/*
 * Skenario: Unit tests for threadsReducer
 * * - Should return initial state when given unknown action
 * * - Should return threads when given RECEIVE_THREADS
 * * - Should add new threads when given ADD_THREADS
 */

import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';
import { ActionType } from './action';

describe('threadsReducer', () => {
  it('should return initial state when given unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return threads when given RECEIVE_THREADS', () => {
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: {
        threads: [{ id: '1', title: 'First thread' }],
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(action.payload.threads);
  });

  it('should add new threads when given ADD_THREADS', () => {
    const initialState = [{ id: '1', title: 'First thread' }];
    const action = {
      type: ActionType.ADD_THREADS,
      payload: {
        threads: [{ id: '2', title: 'Second thread' }],
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([
      { id: '1', title: 'First thread' },
      { id: '2', title: 'Second thread' },
    ]);
  });
});
