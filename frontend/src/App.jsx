import React, { useEffect, useState } from 'react';
import BookingForm from './components/BookingForm';
import SessionDashboard from './components/SessionDashboard';
import BookingsList from './components/BookingsList';

function App() {
  const [participants, setParticipants] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const API_BASE = 'http://localhost:5000/api';

  const fetchParticipants = async () => {
    try {
      const res = await fetch(`${API_BASE}/participants/unassigned`);
      const data = await res.json();
      setParticipants(data);
    } catch (error) {
      console.error('Error fetching participants:', error);
    }
  };

  const fetchSessions = async () => {
    try {
      const res = await fetch(`${API_BASE}/sessions`);
      const data = await res.json();
      setSessions(data);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await fetch(`${API_BASE}/bookings`);
      const data = await res.json();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const refreshAllData = async () => {
    await fetchParticipants();
    await fetchSessions();
    await fetchBookings();
  };

  useEffect(() => {
    refreshAllData();
  }, []);

  const handleBooking = async (participantId, sessionId) => {
    try {
      const res = await fetch(`${API_BASE}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ participantId, sessionId })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        setMessageType('success');
        refreshAllData();
      } else {
        setMessage(data.message || 'Booking failed');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Booking error:', error);
      setMessage('Server error while creating booking');
      setMessageType('error');
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      const res = await fetch(`${API_BASE}/bookings/${bookingId}`, {
        method: 'DELETE'
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        setMessageType('success');
        refreshAllData();
      } else {
        setMessage(data.message || 'Failed to delete booking');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Delete error:', error);
      setMessage('Server error while deleting booking');
      setMessageType('error');
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Smart Seat Allocation Platform</h1>
        <p>Manage training session bookings with rule-based validation</p>
      </header>

      {message && (
        <div className={`message-box ${messageType}`}>
          {message}
        </div>
      )}

      <div className="top-grid">
        <BookingForm
          participants={participants}
          sessions={sessions}
          onBook={handleBooking}
        />

        <SessionDashboard sessions={sessions} />
      </div>

      <BookingsList bookings={bookings} onDelete={handleDeleteBooking} />
    </div>
  );
}

export default App;