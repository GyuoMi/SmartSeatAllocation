import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-slate-950 text-white shadow-lg border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-lg shadow-sm">
              SS
            </div>
            <span className="font-bold text-xl tracking-wide">SmartSeat</span>
          </div>

          {/* Navigation Links using React Router */}
          <div className="flex space-x-2">
            <Link 
              to="/" 
              className="text-gray-300 hover:bg-slate-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              to="/assign" 
              className="bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
            >
              Assign Seats
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}