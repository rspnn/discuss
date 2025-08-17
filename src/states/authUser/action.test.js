/*
 * Skenario: Auth User Actions
 * * - Should create SET_AUTH_USER action with user data
 * * - Should create UNSET_AUTH_USER action
 * * - Should handle asyncSetAuthUser to login and set user
 * *   - Should call alert on login failure
 * * - Should handle asyncUnsetAuthUser to clear user and token
 * */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  ActionType,
} from './action';
import api from '../../utils/api';

// Mock api
vi.mock('../../utils/api');

describe('authUser actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('setAuthUserActionCreator should create SET_AUTH_USER action', () => {
    const fakeUser = { id: 'user-1', name: 'John Doe' };
    const action = setAuthUserActionCreator(fakeUser);

    expect(action).toEqual({
      type: ActionType.SET_AUTH_USER,
      payload: { authUser: fakeUser },
    });
  });

  it('unsetAuthUserActionCreator should create UNSET_AUTH_USER action', () => {
    const action = unsetAuthUserActionCreator();

    expect(action).toEqual({
      type: ActionType.UNSET_AUTH_USER,
      payload: { authUser: null },
    });
  });

  it('asyncSetAuthUser should dispatch setAuthUserActionCreator on success', async () => {
    const fakeToken = 'token-123';
    const fakeUser = { id: 'user-1', name: 'John Doe' };

    api.login.mockResolvedValue(fakeToken);
    api.getOwnProfile.mockResolvedValue(fakeUser);
    api.putAccessToken = vi.fn();

    const dispatch = vi.fn();
    await asyncSetAuthUser({ email: 'test@mail.com', password: 'secret' })(
      dispatch,
    );

    expect(api.login).toHaveBeenCalledWith({
      email: 'test@mail.com',
      password: 'secret',
    });
    expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken);
    expect(api.getOwnProfile).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeUser));
  });

  it('asyncSetAuthUser should call alert on error', async () => {
    const fakeError = new Error('login failed');
    api.login.mockRejectedValue(fakeError);
    window.alert = vi.fn();

    const dispatch = vi.fn();
    await asyncSetAuthUser({ email: 'fail@mail.com', password: 'wrong' })(
      dispatch,
    );

    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
    expect(dispatch).not.toHaveBeenCalled();
  });

  it('asyncUnsetAuthUser should dispatch unsetAuthUserActionCreator and clear token', () => {
    api.putAccessToken = vi.fn();
    const dispatch = vi.fn();

    asyncUnsetAuthUser()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
    expect(api.putAccessToken).toHaveBeenCalledWith('');
  });
});
