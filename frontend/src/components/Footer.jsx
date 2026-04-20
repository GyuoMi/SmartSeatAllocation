export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()} Smart Seat Allocation. Built for the MzansiBuilds Hackathon.
        </p>
      </div>
    </footer>
  );
}