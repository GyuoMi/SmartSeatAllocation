import React, { useState } from 'react';
import BookingForm from '../components/BookingForm';
import BookingsList from '../components/BookingsList';

export default function AssignSeats() {
  // Local state to hold new bookings for the UI demo
  const [bookings, setBookings] = useState([]);

  // Mock dropdown data
  const mockParticipants = [
    { id: 'A01', full_name: 'Alice Johnson', department: 'Division A' },
    { id: 'B01', full_name: 'Bob Smith', department: 'Division B' },
    { id: 'C01', full_name: 'Charlie Davis', department: 'Division C' }
  ];
  
  const mockSessions = [
    { id: 1, session_name: 'Morning Session', remaining_seats: 8 },
    { id: 2, session_name: 'Midday Session', remaining_seats: 0 },
    { id: 3, session_name: 'Afternoon Session', remaining_seats: 15 }
  ];

  const handleBook = (participantId, sessionId) => {
    const selectedParticipant = mockParticipants.find(p => p.id === participantId);
    const selectedSession = mockSessions.find(s => s.id === parseInt(sessionId));

    const newBooking = {
      id: Date.now(), // Generate a temporary ID
      full_name: selectedParticipant.full_name,
      employee_number: `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
      department: selectedParticipant.department,
      session_name: selectedSession.session_name,
      time_slot: 'Assigned Time',
    };
    
    setBookings([...bookings, newBooking]);
  };

  const handleDelete = (id) => {
    setBookings(bookings.filter(b => b.id !== id));
  };

  return (
    <div className="animate-fade-in">
      <header className="mb-8 border-b border-slate-700 pb-4">
        <h1 className="text-3xl font-bold text-white">Seat Allocation</h1>
        <p className="text-slate-400 mt-2">Assign participants to sessions or manage existing bookings.</p>
      </header>

      {/* Grid Layout: Form takes 1 column, Table takes 2 columns on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <BookingForm 
            participants={mockParticipants} 
            sessions={mockSessions} 
            onBook={handleBook} 
          />
        </div>
        <div className="lg:col-span-2">
          <BookingsList 
            bookings={bookings} 
            onDelete={handleDelete} 
          />
        </div>
      </div>
    </div>
  );
}