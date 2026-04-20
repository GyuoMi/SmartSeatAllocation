export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            {/* Simple CSS Logo - Swap with an <img src={logo} /> later if you want */}
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center font-bold text-lg shadow-sm">
              SS
            </div>
            <span className="font-bold text-xl tracking-wide">SmartSeat</span>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-2">
            <a 
              href="/" 
              className="text-gray-300 hover:bg-slate-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Dashboard
            </a>
            <a 
              href="/assign" 
              className="bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
            >
              Assign Seats
            </a>
          </div>

        </div>
      </div>
    </nav>
  );
}