import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/layout/Navbar";
import StatsCards from "../components/dashboard/StatsCards";
import RecentSessions from "../components/dashboard/RecentSessions";
import { getStats, getSessions } from "../services/sessionService";
import {
  RiCameraLine,
  RiBookOpenLine,
  RiArrowRightLine,
  RiHandHeartLine,
  RiImageLine,
  RiHistoryLine,
} from "react-icons/ri";

const quickLinks = [
  {
    icon: RiCameraLine,
    title: "Live Interpreter",
    text: "Open your camera and start real time ASL sign interpretation.",
    link: "/interpreter",
    accent: true,
  },
  {
    icon: RiImageLine,
    title: "Analyze Image",
    text: "Upload a photo of a hand sign and get instant AI analysis.",
    link: "/analyze",
    accent: false,
  },
  {
    icon: RiBookOpenLine,
    title: "Sign Dictionary",
    text: "Browse and learn all supported ASL signs with instructions.",
    link: "/dictionary",
    accent: false,
  },
  {
    icon: RiHistoryLine,
    title: "Session History",
    text: "Review all your past translation sessions and replay them.",
    link: "/history",
    accent: false,
  },
];

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

        <div className="grid lg:grid-cols-[1fr_340px] gap-6">
          <RecentSessions sessions={sessions} loading={loadingSessions} />

          <div className="flex flex-col gap-3">
            {quickLinks.map((card) => (
              <Link to={card.link} key={card.title}>
                <div
                  className={`rounded-2xl p-5 border transition-all group cursor-pointer ${
                    card.accent
                      ? "bg-indigo-600/10 border-indigo-500/20 hover:border-indigo-500/40"
                      : "bg-white/[0.03] border-white/5 hover:border-indigo-500/20"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        card.accent
                          ? "bg-indigo-600/20"
                          : "bg-white/[0.06]"
                      }`}
                    >
                      <card.icon
                        size={18}
                        className={card.accent ? "text-indigo-400" : "text-gray-300"}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white text-sm mb-0.5">
                        {card.title}
                      </h3>
                      <p className="text-xs text-gray-400 line-clamp-1">
                        {card.text}
                      </p>
                    </div>
                    <RiArrowRightLine
                      size={16}
                      className="text-gray-600 group-hover:text-indigo-400 transition-colors flex-shrink-0"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}