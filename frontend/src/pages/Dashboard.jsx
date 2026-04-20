import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SessionDashboard from "../components/SessionDashboard";

function Dashboard() {

  // 🔹 Overall mock allocations
  const mockAllocations = [
    { department: "A" },
    { department: "B" },
    { department: "A" },
    { department: "C" },
    { department: "B" },
    { department: "A" }
  ];

  // 🔹 Division counts
  const divisions = { A: 0, B: 0, C: 0 };
  mockAllocations.forEach(a => divisions[a.department]++);

  const totalSessions = 3;
  const totalAllocated = mockAllocations.length;
  const totalCapacity = 60;
  const remainingSeats = totalCapacity - totalAllocated;

  // 🔹 Session-level data (from teammate)
  const mockSessions = [
    {
      id: 1,
      session_name: 'Morning Session',
      time_slot: '09:00 - 10:30',
      capacity: 20,
      total_booked: 12,
      remaining_seats: 8,
      division_a_count: 5,
      division_a_limit: 8,
      division_b_count: 4,
      division_b_limit: 8,
      division_c_count: 3,
      division_c_limit: 6
    },
    {
      id: 2,
      session_name: 'Midday Session',
      time_slot: '11:00 - 12:30',
      capacity: 20,
      total_booked: 20,
      remaining_seats: 0,
      division_a_count: 8,
      division_a_limit: 8,
      division_b_count: 8,
      division_b_limit: 8,
      division_c_count: 4,
      division_c_limit: 6
    },
    {
      id: 3,
      session_name: 'Afternoon Session',
      time_slot: '13:00 - 14:30',
      capacity: 20,
      total_booked: 5,
      remaining_seats: 15,
      division_a_count: 2,
      division_a_limit: 8,
      division_b_count: 1,
      division_b_limit: 8,
      division_c_count: 2,
      division_c_limit: 6
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      <Navbar />

      <div className="p-6 flex-grow">

        {/* 🔥 OVERALL SYSTEM STATS */}
        <h2 className="text-xl font-semibold mb-6">System Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white p-5 rounded shadow border-l-4 border-blue-500">
            <h3>Total Sessions</h3>
            <p className="text-2xl font-bold">{totalSessions}</p>
          </div>

          <div className="bg-white p-5 rounded shadow border-l-4 border-green-500">
            <h3>Allocated Seats</h3>
            <p className="text-2xl font-bold">{totalAllocated}</p>
          </div>

          <div className="bg-white p-5 rounded shadow border-l-4 border-red-500">
            <h3>Remaining Seats</h3>
            <p className="text-2xl font-bold">{remainingSeats}</p>
          </div>

        </div>

        {/* 🏢 DIVISION STATS */}
        <h2 className="text-xl font-semibold mt-10 mb-6">Division Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white p-5 rounded shadow border-l-4 border-purple-500">
            <h3>Division A</h3>
            <p className="text-2xl font-bold">{divisions.A}</p>
          </div>

          <div className="bg-white p-5 rounded shadow border-l-4 border-yellow-500">
            <h3>Division B</h3>
            <p className="text-2xl font-bold">{divisions.B}</p>
          </div>

          <div className="bg-white p-5 rounded shadow border-l-4 border-pink-500">
            <h3>Division C</h3>
            <p className="text-2xl font-bold">{divisions.C}</p>
          </div>

        </div>

        {/* 📊 SESSION DASHBOARD */}
        <h2 className="text-xl font-semibold mt-10 mb-6">Session Breakdown</h2>

        <SessionDashboard sessions={mockSessions} />

      </div>

      <Footer />

    </div>
  );
}

export default Dashboard;