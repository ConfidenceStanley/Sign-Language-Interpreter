import { useNavigate } from "react-router-dom";
import { RiArrowRightLine, RiTimeLine, RiTranslate2 } from "react-icons/ri";
import Button from "../ui/Button";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDuration(seconds) {
  if (seconds < 60) return `${seconds}s`;
  return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
}

export default function RecentSessions({ sessions, loading }) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">Recent Sessions</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-white/[0.03] rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-white font-semibold">Recent Sessions</h3>
        <Button
          variant="ghost"
          onClick={() => navigate("/history")}
          className="text-sm gap-1.5 text-indigo-400 hover:text-indigo-300"
        >
          View all
          <RiArrowRightLine size={14} />
        </Button>
      </div>

      {sessions.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-sm">No sessions yet. Start interpreting to see your history here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => navigate(`/history/${session.id}`)}
              className="w-full text-left bg-white/[0.03] border border-white/5 rounded-xl p-4 hover:border-indigo-500/20 transition-all group"
            >
              <p className="text-white text-sm font-medium line-clamp-1 mb-2 group-hover:text-indigo-300 transition-colors">
                {session.translation || "Empty session"}
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <RiTranslate2 size={12} />
                  {session.word_count} words
                </span>
                <span className="flex items-center gap-1.5">
                  <RiTimeLine size={12} />
                  {formatDuration(session.duration_seconds)}
                </span>
                <span className="ml-auto">{formatDate(session.created_at)}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}