import React from 'react';

function BookingsList({ bookings, onDelete }) {
  return (
    <div className="card">
      <h2>Current Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings have been made yet.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Participant</th>
                <th>Employee No.</th>
                <th>Department</th>
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