import React, { useState } from 'react';

function BookingForm({ participants, sessions, onBook }) {
  const [participantId, setParticipantId] = useState('');
  const [sessionId, setSessionId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!participantId || !sessionId) {
      return;
    }

    onBook(participantId, sessionId);
    setParticipantId('');
    setSessionId('');
  };

  return (
    <div className="card">
      <h2>Book Participant</h2>
      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-group">
          <label>Select Participant</label>
          <select
            value={participantId}
            onChange={(e) => setParticipantId(e.target.value)}
            required
          >
            <option value="">-- Choose Participant --</option>
            {participants.map((participant) => (
              <option key={participant.id} value={participant.id}>
                {participant.full_name} - {participant.department}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Select Session</label>
          <select
            value={sessionId}
            onChange={(e) => setSessionId(e.target.value)}
            required
          >
            <option value="">-- Choose Session --</option>
            {sessions.map((session) => (
              <option key={session.id} value={session.id}>
                {session.session_name} ({session.remaining_seats} seats left)
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="primary-btn">
          Confirm Booking
        </button>
      </form>
    </div>
  );
}

export default BookingForm;