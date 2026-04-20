import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [division, setDivision] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (division) {
      setError('');
      // Send them to the new Dashboard route!
      navigate('/dashboard'); 
    } else {
      setError('Please select a division to continue.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[75vh] animate-fade-in">
      <div className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-xl p-8 shadow-lg">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-2xl text-white mx-auto mb-4 shadow-sm">
            SS
          </div>
          <h2 className="text-2xl font-bold text-white">Select Division</h2>
          <p className="text-slate-400 text-sm mt-2">Choose your department to access SmartSeat</p>
        </div>

        {/* Error Message Alert */}
        {error && (
          <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm mb-6 text-center">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="flex flex-col space-y-1 text-left">
            <label className="text-sm font-medium text-slate-300">Department / Division</label>
            <select
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 outline-none transition-colors"
              required
            >
              <option value="">-- Choose a Division --</option>
              <option value="Division A">Division A</option>
              <option value="Division B">Division B</option>
              <option value="Division C">Division C</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg text-sm px-5 py-3 transition-colors mt-4 shadow-sm"
          >
            Enter Dashboard
          </button>
        </form>
        
      </div>
    </div>
  );
}