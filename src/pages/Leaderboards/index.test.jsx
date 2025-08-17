/*
 * Skenario: Leaderboard Page Tests
 * - Should render title "Leaderboard"
 *   - Should dispatch asyncReceiveLeaderboard on mount
 *   - Should render leaderboard items from state
 *      - Each item should display rank, user name, and score
 *
 * */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Leaderboard from './index';
import * as leaderboardActions from '../../states/leaderboards/action';

vi.mock('../../states/leaderboards/action', () => ({
  asyncReceiveLeaderboard: vi.fn(() => ({ type: 'MOCK_ACTION' })),
}));

function renderWithStore(initialState) {
  const store = configureStore({
    reducer: (state = initialState, action) => state,
    preloadedState: initialState,
  });

  return render(
    <Provider store={store}>
      <Leaderboard />
    </Provider>,
  );
}

describe('Leaderboard page', () => {
  it('should render title', () => {
    renderWithStore({ leaderboards: [] });

    expect(screen.getByText(/Leaderboard/i)).toBeInTheDocument();
  });

  it('should dispatch asyncReceiveLeaderboard on mount', () => {
    renderWithStore({ leaderboards: [] });

    expect(leaderboardActions.asyncReceiveLeaderboard).toHaveBeenCalled();
  });

  it('should render leaderboard items from state', () => {
    const fakeLeaderboards = [
      {
        user: {
          id: 'user-1',
          name: 'John Doe',
          avatar: 'https://example.com/john.png',
        },
        score: 100,
      },
      {
        user: {
          id: 'user-2',
          name: 'Jane Smith',
          avatar: 'https://example.com/jane.png',
        },
        score: 80,
      },
    ];

    renderWithStore({ leaderboards: fakeLeaderboards });

    expect(screen.getByText('#1')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();

    expect(screen.getByText('#2')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('80')).toBeInTheDocument();
  });
});
