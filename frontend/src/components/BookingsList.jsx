import React from 'react';

function BookingsList({ bookings, onDelete }) {
  return (
    <div className="card">
      <div className="section-header">
        <h2>Booking Register</h2>
        <span className="section-subtext">Current confirmed participant allocations</span>
      </div>

      {bookings.length === 0 ? (
        <div className="empty-state">No bookings have been recorded yet.</div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Participant</th>
                <th>Employee Number</th>
                <th>Division</th>
                <th>Session</th>
                <th>Time Slot</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.full_name}</td>
                  <td>{booking.employee_number}</td>
                  <td>{booking.department}</td>
                  <td>{booking.session_name}</td>
                  <td>{booking.time_slot}</td>
                  <td>
                    <button
                      className="danger-btn"
                      onClick={() => onDelete(booking.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BookingsList;