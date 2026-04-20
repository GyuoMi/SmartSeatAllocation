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
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-bold text-white mb-4">Book Participant</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-slate-300">Select Participant</label>
          <select
            value={participantId}
            onChange={(e) => setParticipantId(e.target.value)}
            required
            className="bg-slate-900 border border-slate-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="">-- Choose Participant --</option>
            {participants?.map((participant) => (
              <option key={participant.id} value={participant.id}>
                {participant.full_name} - {participant.department}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-slate-300">Select Session</label>
          <select
            value={sessionId}
            onChange={(e) => setSessionId(e.target.value)}
            required
            className="bg-slate-900 border border-slate-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="">-- Choose Session --</option>
            {sessions?.map((session) => (
              <option key={session.id} value={session.id}>
                {session.session_name} ({session.remaining_seats} seats left)
              </option>
            ))}
          </select>
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg text-sm px-5 py-2.5 transition-colors mt-2"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
}

export default BookingForm;