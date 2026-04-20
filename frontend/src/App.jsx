import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import AssignSeats from "./pages/AssignSeats";

function App() {
  return (
    <Router>
      <Routes>

        {/* ✅ Dashboard at root */}
        <Route path="/" element={<Dashboard />} />

        {/* ✅ Assign page */}
        <Route path="/assign" element={<AssignSeats />} />

      </Routes>
    </Router>
  );
}

export default App;