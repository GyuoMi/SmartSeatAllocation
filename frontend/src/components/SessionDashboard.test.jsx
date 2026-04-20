import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SessionDashboard from './SessionDashboard';

describe('SessionDashboard Component', () => {
  const mockSessions = [
    {
      id: 1,
      session_name: 'Morning Session',
      time_slot: '09:00 - 10:30',
      capacity: 20,
      total_booked: 5,
      remaining_seats: 15,
      division_a_count: 2, division_a_limit: 8,
      division_b_count: 2, division_b_limit: 8,
      division_c_count: 1, division_c_limit: 6,
    }
  ];

  it('renders the dashboard heading', () => {
    render(<SessionDashboard sessions={mockSessions} />);
    
    // Check if our main heading is there
    expect(screen.getByText('Session Overview')).toBeInTheDocument();
  });

  it('renders session data correctly', () => {
    render(<SessionDashboard sessions={mockSessions} />);
    
    // Check if the specific session name rendered
    expect(screen.getByText('Morning Session')).toBeInTheDocument();
    
    // Check if the specific time slot rendered
    expect(screen.getByText('09:00 - 10:30')).toBeInTheDocument();
    
    // Check if the capacity string rendered correctly (Total Booked: 5/20)
    expect(screen.getByText('5/20')).toBeInTheDocument();
  });

  it('handles empty session arrays gracefully', () => {
    render(<SessionDashboard sessions={[]} />);
    
    // The heading should still render even with no data
    expect(screen.getByText('Session Overview')).toBeInTheDocument();
  });
});