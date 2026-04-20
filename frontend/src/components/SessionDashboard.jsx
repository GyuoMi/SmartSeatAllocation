import React from 'react';

function SessionDashboard({ sessions }) {
  return (
    <div className="card">
      <h2>Session Overview</h2>

      <div className="session-grid">
        {sessions.map((session) => (
          <div key={session.id} className="session-card">
            <h3>{session.session_name}</h3>
            <p><strong>Time:</strong> {session.time_slot}</p>
            <p><strong>Booked:</strong> {session.total_booked}/{session.capacity}</p>
            <p><strong>Remaining Seats:</strong> {session.remaining_seats}</p>

            <div className="division-stats">
              <p>Division A: {session.division_a_count}/{session.division_a_limit}</p>
              <p>Division B: {session.division_b_count}/{session.division_b_limit}</p>
              <p>Division C: {session.division_c_count}/{session.division_c_limit}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SessionDashboard;