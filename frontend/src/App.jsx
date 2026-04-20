import { useState, useEffect } from 'react';

function App() {
  // --- State Management ---
  const [sessions, setSessions] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState('A');
  const [selectedParticipant, setSelectedParticipant] = useState('');
  const [selectedSession, setSelectedSession] = useState('');
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  // --- Data Fetching ---
  // In a real hackathon, this runs when the component mounts to get the latest DB state
  const fetchData = async () => {
    try {
      // Example Express endpoints you will need to build
      const sessionsRes = await fetch('http://localhost:3000/api/sessions');
      const participantsRes = await fetch(`http://localhost:3000/api/participants?division=${selectedDivision}&allocated=false`);
      
      const sessionsData = await sessionsRes.json();
      const participantsData = await participantsRes.json();

      setSessions(sessionsData);
      setParticipants(participantsData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  // Re-fetch participants whenever the HR manager changes the division dropdown
  useEffect(() => {
    fetchData();
  }, [selectedDivision]);

  // --- Handlers ---
  const handleAllocate = async (e) => {
    e.preventDefault();
    setFeedback({ type: '', message: '' });

    if (!selectedParticipant || !selectedSession) {
      setFeedback({ type: 'error', message: 'Please select both a participant and a session.' });
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/allocate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          participantId: selectedParticipant,
          sessionId: selectedSession
        })
      });

      const data = await response.json();

      if (!response.ok) {
        // This catches the 20-seat limit or the Division quota limits!
        setFeedback({ type: 'error', message: data.error || 'Allocation failed due to constraints.' });
      } else {
        setFeedback({ type: 'success', message: 'Participant allocated successfully!' });
        // Reset selections and refresh the dashboard data
        setSelectedParticipant('');
        fetchData(); 
      }
    } catch (error) {
      setFeedback({ type: 'error', message: 'Server error. Please try again.' });
    }
  };

  // --- UI Render ---
  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <header className="mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-900">Smart Seat Allocation</h1>
          <p className="text-gray-600 mt-2">Manage training sessions securely and efficiently.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column: The Allocation Form */}
          <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Allocate Participant</h2>
            
            <form onSubmit={handleAllocate} className="space-y-4">
              {/* 1. Division Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">HR Division View</label>
                <select 
                  value={selectedDivision} 
                  onChange={(e) => setSelectedDivision(e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="A">Division A</option>
                  <option value="B">Division B</option>
                  <option value="C">Division C</option>
                </select>
              </div>

              {/* 2. Participant Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unallocated Staff</label>
                <select 
                  value={selectedParticipant} 
                  onChange={(e) => setSelectedParticipant(e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">-- Select Participant --</option>
                  {participants.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              {/* 3. Session Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Session</label>
                <select 
                  value={selectedSession} 
                  onChange={(e) => setSelectedSession(e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">-- Select Session --</option>
                  {sessions.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.time_slot})
                    </option>
                  ))}
                </select>
              </div>

              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Allocate
              </button>

              {/* Feedback Banner */}
              {feedback.message && (
                <div className={`p-3 rounded-md text-sm ${feedback.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                  {feedback.message}
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Session Dashboard */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Session Overview</h2>
            
            {/* Map through the 3 sessions */}
            {sessions.map(session => (
              <div key={session.id} className="bg-white p-5 rounded-lg shadow-sm border flex flex-col sm:flex-row justify-between items-center">
                
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{session.name} Session</h3>
                  <p className="text-gray-500 text-sm">{session.time_slot}</p>
                </div>

                {/* Division Breakdown */}
                <div className="flex gap-4 my-3 sm:my-0 text-sm">
                  <div className="text-center px-3 border-r">
                    <p className="font-semibold text-gray-700">Div A</p>
                    <p className="text-gray-500">{session.divA_count || 0} / 8</p>
                  </div>
                  <div className="text-center px-3 border-r">
                    <p className="font-semibold text-gray-700">Div B</p>
                    <p className="text-gray-500">{session.divB_count || 0} / 6</p>
                  </div>
                  <div className="text-center px-3">
                    <p className="font-semibold text-gray-700">Div C</p>
                    <p className="text-gray-500">{session.divC_count || 0} / 6</p>
                  </div>
                </div>

                {/* Total Capacity Pill */}
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
                    session.total_count >= session.max_capacity 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-blue-100 text-blue-800'
                  }`}>
                    {session.max_capacity - (session.total_count || 0)} Seats Left
                  </span>
                </div>

              </div>
            ))}

            {sessions.length === 0 && (
              <div className="text-gray-500 text-center py-8 bg-gray-100 rounded-lg border border-dashed">
                Loading session data...
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;