import { useAuth } from "../context/AuthContext";
import Navbar from "../components/layout/Navbar";
import { RiHandHeartLine } from "react-icons/ri";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <Navbar />
      <div className="pt-32 px-6 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-indigo-600/15 rounded-xl flex items-center justify-center">
            <RiHandHeartLine size={20} className="text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Welcome, {user?.full_name}</h1>
            <p className="text-sm text-gray-400">Ready to start interpreting?</p>
          </div>
        </div>
      </div>
    </div>
  );
}