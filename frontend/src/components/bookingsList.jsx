import React from 'react';

function BookingsList({ bookings, onDelete }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-sm overflow-hidden mt-8">
      <div className="p-6 border-b border-slate-700">
        <h2 className="text-xl font-bold text-white">Current Bookings</h2>
      </div>

      {!bookings || bookings.length === 0 ? (
        <div className="p-8 text-center text-slate-400">
          <p>No bookings have been made yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-300">
            <thead className="text-xs text-slate-400 uppercase bg-slate-900/50">
              <tr>
                <th className="px-6 py-4 font-medium">Participant</th>
                <th className="px-6 py-4 font-medium">Employee No.</th>
                <th className="px-6 py-4 font-medium">Department</th>
                <th className="px-6 py-4 font-medium">Session</th>
                <th className="px-6 py-4 font-medium">Time Slot</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{booking.full_name}</td>
                  <td className="px-6 py-4 font-mono">{booking.employee_number}</td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-900 text-slate-300 px-2.5 py-0.5 rounded border border-slate-600 text-xs">
                      {booking.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-blue-400">{booking.session_name}</td>
                  <td className="px-6 py-4 text-slate-400">{booking.time_slot}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      className="text-red-400 hover:text-white hover:bg-red-600 border border-red-900 hover:border-red-600 rounded px-3 py-1 text-xs transition-colors"
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