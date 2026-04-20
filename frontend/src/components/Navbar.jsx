import { NavLink } from 'react-router-dom';

export default function Navbar() {
  // We define a helper function to determine the classes based on active state
  const getNavClasses = ({ isActive }) => {
    return isActive 
      ? "bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-colors"
      : "text-gray-300 hover:bg-slate-800 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-colors";
  };

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

          {/* Navigation Links using NavLink for active state tracking */}
          <div className="flex space-x-2">
            <NavLink to="/" className={getNavClasses}>
              Dashboard
            </NavLink>
            <NavLink to="/assign" className={getNavClasses}>
              Assign Seats
            </NavLink>
          </div>

        </div>
      </div>
    </nav>
  );
}