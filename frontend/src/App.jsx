import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import AssignSeats from './pages/AssignSeats';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100">
        <Navbar />
        
        <main className="grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            {/* Login is now the default startup page */}
            <Route path="/" element={<Login />} />
            
            {/* Dashboard and Assign Seats get their own paths */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/assign" element={<AssignSeats />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;