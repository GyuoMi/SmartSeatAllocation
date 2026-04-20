import React from 'react';
import SessionDashboard from '../components/SessionDashboard';

export default function Dashboard() {
  // Mock data to visualize the UI before connecting the backend
  const mockSessions = [
    { id: 1, session_name: 'Morning Session', time_slot: '09:00 - 10:30', capacity: 20, total_booked: 12, remaining_seats: 8, division_a_count: 5, division_a_limit: 8, division_b_count: 4, division_b_limit: 8, division_c_count: 3, division_c_limit: 6 },
    { id: 2, session_name: 'Midday Session', time_slot: '11:00 - 12:30', capacity: 20, total_booked: 20, remaining_seats: 0, division_a_count: 8, division_a_limit: 8, division_b_count: 8, division_b_limit: 8, division_c_count: 4, division_c_limit: 6 },
    { id: 3, session_name: 'Afternoon Session', time_slot: '13:00 - 14:30', capacity: 20, total_booked: 5, remaining_seats: 15, division_a_count: 2, division_a_limit: 8, division_b_count: 1, division_b_limit: 8, division_c_count: 2, division_c_limit: 6 }
  ];

  return (
    <div className="animate-fade-in">
      <header className="mb-8 border-b border-slate-700 pb-4">
        <h1 className="text-3xl font-bold text-white">System Dashboard</h1>
        <p className="text-slate-400 mt-2">Overview of all training session capacities and department allocations.</p>
      </header>
      
      <SessionDashboard sessions={mockSessions} />
    </div>
  );
}