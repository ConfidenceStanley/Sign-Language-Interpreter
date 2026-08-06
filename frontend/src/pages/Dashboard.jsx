import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/layout/Navbar";
import Button from "../components/ui/Button";
import StatsCards from "../components/dashboard/StatsCards";
import RecentSessions from "../components/dashboard/RecentSessions";
import { getStats, getSessions } from "../services/sessionService";
import {
  RiCameraLine,
  RiBookOpenLine,
  RiArrowRightLine,
  RiHandHeartLine,
} from "react-icons/ri";

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingSessions, setLoadingSessions] = useState(true);

  useEffect(() => {
    getStats()
      .then((res) => setStats(res.data))
      .catch(console.error)
      .finally(() => setLoadingStats(false));

    getSessions(1)
      .then((res) => setSessions(res.data.sessions.slice(0, 5)))
      .catch(console.error)
      .finally(() => setLoadingSessions(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <Navbar />

      <div className="pt-28 pb-16 px-6 max-w-7xl mx-auto">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium px-4 py-1.5 rounded-full mb-4">
            Your Workspace
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-indigo-600/15 rounded-2xl flex items-center justify-center flex-shrink-0">
              <RiHandHeartLine size={22} className="text-indigo-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user?.full_name}
              </h1>
              <p className="text-gray-400 max-w-2xl">
                Here is an overview of your SignBridge activity. Start a new
                session or browse your history below.
              </p>
            </div>
          </div>
        </div>

        <StatsCards stats={stats} loading={loadingStats} />

        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          <RecentSessions sessions={sessions} loading={loadingSessions} />

          <div className="flex flex-col gap-4">
            <Link to="/interpreter">
              <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-2xl p-5 hover:border-indigo-500/40 transition-all group cursor-pointer">
                <div className="w-10 h-10 bg-indigo-600/20 rounded-xl flex items-center justify-center mb-4">
                  <RiCameraLine size={18} className="text-indigo-400" />
                </div>
                <h3 className="font-semibold text-white mb-1">Start Interpreting</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Open the live camera interpreter and begin signing.
                </p>
                <div className="flex items-center gap-1.5 text-indigo-400 text-sm font-medium group-hover:gap-3 transition-all">
                  Open Interpreter
                  <RiArrowRightLine size={14} />
                </div>
              </div>
            </Link>

            <Link to="/dictionary">
              <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 hover:border-indigo-500/20 transition-all group cursor-pointer">
                <div className="w-10 h-10 bg-white/[0.06] rounded-xl flex items-center justify-center mb-4">
                  <RiBookOpenLine size={18} className="text-gray-300" />
                </div>
                <h3 className="font-semibold text-white mb-1">Sign Dictionary</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Browse and learn all supported ASL signs.
                </p>
                <div className="flex items-center gap-1.5 text-indigo-400 text-sm font-medium group-hover:gap-3 transition-all">
                  Browse Signs
                  <RiArrowRightLine size={14} />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}