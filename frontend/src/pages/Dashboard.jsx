import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {

  // 🔹 Mock data (safe + simple)
  const mockAllocations = [
    { department: "A" },
    { department: "B" },
    { department: "A" },
    { department: "C" },
    { department: "B" },
    { department: "A" }
  ];

  // 🔹 Count divisions
  const divisions = { A: 0, B: 0, C: 0 };

  mockAllocations.forEach((a) => {
    divisions[a.department]++;
  });

  // 🔹 Stats
  const totalSessions = 3;
  const totalAllocated = mockAllocations.length;
  const totalCapacity = 60;
  const remainingSeats = totalCapacity - totalAllocated;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* NAVBAR */}
      <Navbar />

      {/* CONTENT */}
      <div className="p-6 flex-grow">

        <h2 className="text-xl font-semibold mb-6">System Overview</h2>

        {/* 🔥 SYSTEM STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white p-5 rounded-2xl shadow-md border-l-4 border-blue-500">
            <h3 className="text-gray-500 text-sm">Total Sessions</h3>
            <p className="text-3xl font-bold mt-2">{totalSessions}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-md border-l-4 border-green-500">
            <h3 className="text-gray-500 text-sm">Allocated Seats</h3>
            <p className="text-3xl font-bold mt-2">{totalAllocated}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-md border-l-4 border-red-500">
            <h3 className="text-gray-500 text-sm">Remaining Seats</h3>
            <p className="text-3xl font-bold mt-2">{remainingSeats}</p>
          </div>

        </div>

        {/* 🏢 DIVISION STATS */}
        <h2 className="text-xl font-semibold mt-10 mb-6">Division Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white p-5 rounded-2xl shadow-md border-l-4 border-purple-500">
            <h3 className="text-gray-500 text-sm">Division A</h3>
            <p className="text-3xl font-bold mt-2">{divisions.A}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-md border-l-4 border-yellow-500">
            <h3 className="text-gray-500 text-sm">Division B</h3>
            <p className="text-3xl font-bold mt-2">{divisions.B}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-md border-l-4 border-pink-500">
            <h3 className="text-gray-500 text-sm">Division C</h3>
            <p className="text-3xl font-bold mt-2">{divisions.C}</p>
          </div>

        </div>

      </div>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}

export default Dashboard;