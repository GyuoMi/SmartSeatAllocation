import React, { useState } from 'react';

function BookingForm({ participants, sessions, onBook }) {
  const [participantId, setParticipantId] = useState('');
  const [sessionId, setSessionId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!participantId || !sessionId) return;

    onBook(participantId, sessionId);
    setParticipantId('');
    setSessionId('');
  };

  return (
    <div className="card">
      <div className="section-header">
        <h2>Create Allocation</h2>
        <span className="section-subtext">Assign an available participant to a session</span>
      </div>

      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-group">
          <label>Participant</label>
          <select
            value={participantId}
            onChange={(e) => setParticipantId(e.target.value)}
            required
          >
            <option value="">Select participant</option>
            {participants.map((participant) => (
              <option key={participant.id} value={participant.id}>
                {participant.full_name} - {participant.department}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Training Session</label>
          <select
            value={sessionId}
            onChange={(e) => setSessionId(e.target.value)}
            required
          >
            <option value="">Select session</option>
            {sessions.map((session) => (
              <option key={session.id} value={session.id}>
                {session.session_name} | {session.time_slot} | {session.remaining_seats} seats remaining
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="primary-btn">
          Submit Allocation
        </button>
      </form>
    </div>
  );
}

export default BookingForm;