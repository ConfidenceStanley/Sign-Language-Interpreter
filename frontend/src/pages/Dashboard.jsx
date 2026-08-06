import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/layout/Navbar";
import Button from "../components/ui/Button";
import {
  RiHandHeartLine,
  RiCameraLine,
  RiBookOpenLine,
  RiHistoryLine,
  RiArrowRightLine,
} from "react-icons/ri";

const cards = [
  {
    icon: RiCameraLine,
    title: "Start Interpreter",
    text: "Open the live interpreter and begin real time hand detection and sign recognition.",
    link: "/interpreter",
  },
  {
    icon: RiBookOpenLine,
    title: "Sign Dictionary",
    text: "Browse supported signs and learn how each gesture is performed.",
    link: "/dictionary",
  },
  {
    icon: RiHistoryLine,
    title: "Session History",
    text: "Review previous translations and monitor your communication sessions.",
    link: "/history",
  },
];

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <Navbar />

      <div className="pt-28 px-6 max-w-7xl mx-auto">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium px-4 py-1.5 rounded-full mb-4">
            Your Workspace
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-indigo-600/15 rounded-2xl flex items-center justify-center">
              <RiHandHeartLine size={22} className="text-indigo-400" />
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.full_name}</h1>
              <p className="text-gray-400 max-w-2xl">
                You are now inside your SignBridge workspace. Start a live interpretation session,
                browse available signs, and manage your communication history.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 hover:border-indigo-500/20 transition-all duration-300"
            >
              <div className="w-11 h-11 bg-indigo-600/15 rounded-xl flex items-center justify-center mb-5">
                <card.icon size={20} className="text-indigo-400" />
              </div>

              <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">{card.text}</p>

              <Link to={card.link}>
                <Button className="gap-2">
                  Open
                  <RiArrowRightLine size={16} />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}