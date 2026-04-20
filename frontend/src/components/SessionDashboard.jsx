import React from 'react';

function SessionDashboard({ sessions }) {
  return (
    <div className="card">
      <div className="section-header">
        <h2>Session Allocation Overview</h2>
        <span className="section-subtext">Live seat and division allocation status</span>
      </div>

      <div className="session-grid">
        {sessions.map((session) => {
          const percentFull = session.capacity
            ? (Number(session.total_booked) / Number(session.capacity)) * 100
            : 0;

          return (
            <div key={session.id} className="session-card">
              <h3>{session.session_name}</h3>

              <div className="session-meta">
                <p><strong>Time Slot:</strong> {session.time_slot}</p>
                <p><strong>Capacity:</strong> {session.total_booked}/{session.capacity}</p>
                <p><strong>Remaining:</strong> {session.remaining_seats} seats</p>
              </div>

              <div className="capacity-bar">
                <div
                  className="capacity-fill"
                  style={{ width: `${percentFull}%` }}
                ></div>
              </div>

              <div className="division-stats">
                <div className="division-row">
                  <span className="badge badge-a">Division A</span>
                  <span>{session.division_a_count}/{session.division_a_limit}</span>
                </div>
                <div className="division-row">
                  <span className="badge badge-b">Division B</span>
                  <span>{session.division_b_count}/{session.division_b_limit}</span>
                </div>
                <div className="division-row">
                  <span className="badge badge-c">Division C</span>
                  <span>{session.division_c_count}/{session.division_c_limit}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SessionDashboard;