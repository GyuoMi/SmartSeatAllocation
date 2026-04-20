import React from 'react';

function SessionDashboard({ sessions }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-4">Session Overview</h2>

      {/* Grid layout: 1 column on mobile, 3 columns on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sessions?.map((session) => (
          <div key={session.id} className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-sm flex flex-col">
            <h3 className="text-lg font-bold text-blue-400 mb-2">{session.session_name}</h3>
            
            <div className="space-y-1 text-sm text-slate-300 mb-4 border-b border-slate-700 pb-4">
              <p><strong className="text-white">Time:</strong> {session.time_slot}</p>
              <p><strong className="text-white">Booked:</strong> {session.total_booked}/{session.capacity}</p>
              <p><strong className="text-white">Remaining Seats:</strong> {session.remaining_seats}</p>
            </div>

            <div className="space-y-2 text-sm">
              <p className="flex justify-between items-center text-slate-400">
                <span>Division A</span>
                <span className="font-mono text-white">{session.division_a_count} / {session.division_a_limit}</span>
              </p>
              <p className="flex justify-between items-center text-slate-400">
                <span>Division B</span>
                <span className="font-mono text-white">{session.division_b_count} / {session.division_b_limit}</span>
              </p>
              <p className="flex justify-between items-center text-slate-400">
                <span>Division C</span>
                <span className="font-mono text-white">{session.division_c_count} / {session.division_c_limit}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SessionDashboard;