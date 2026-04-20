import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      
      {/* Main Content Area */}
      <main className="grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-4">Dashboard Workspace</h1>
        <p className="text-slate-600">Your allocation interface will go here.</p>
      </main>

      <Footer />
    </div>
  );
}

export default App;
