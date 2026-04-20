import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AssignSeats() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      <Navbar />

      <div className="p-6 flex-grow">
        <h1 className="text-2xl font-bold mb-4">Assign Seats</h1>

        <p>This is where seat allocation logic will go.</p>
      </div>

      <Footer />
    </div>
  );
}

export default AssignSeats;