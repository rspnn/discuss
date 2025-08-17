/*
 Skenario: Navbar Component Tests
  - Should render the Navbar with logo and links
  - Should show "Sign In" link when authUser is null
  - Should show "Sign Out" button when authUser is provided
*/

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './index';

function renderWithRouter(ui) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('Navbar component', () => {
  it('should render logo and links', () => {
    renderWithRouter(<Navbar authUser={null} signOut={() => {}} />);

    expect(screen.getByText(/Discuss/i)).toBeInTheDocument();
    expect(screen.getByText(/Threads/i)).toBeInTheDocument();
    expect(screen.getByText(/Leaderboards/i)).toBeInTheDocument();
  });

  it('should show "Sign In" link if authUser is null', () => {
    renderWithRouter(<Navbar authUser={null} signOut={() => {}} />);

    const signInLink = screen.getByText(/Sign In/i);
    expect(signInLink).toBeInTheDocument();
    expect(signInLink.closest('a')).toHaveAttribute('href', '/login');
  });

  it('should show "Sign Out" button if authUser is provided', () => {
    const fakeUser = {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://example.com/avatar.png',
    };
    const signOutMock = vi.fn();

    renderWithRouter(<Navbar authUser={fakeUser} signOut={signOutMock} />);

    const signOutButton = screen.getByRole('button', { name: /Sign Out/i });
    expect(signOutButton).toBeInTheDocument();

    // Simulate click
    fireEvent.click(signOutButton);
    expect(signOutMock).toHaveBeenCalled();
  });
});
