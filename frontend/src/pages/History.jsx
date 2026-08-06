import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { getSessions, deleteSession } from "../services/sessionService";
import {
  RiHistoryLine,
  RiTimeLine,
  RiTranslate2,
  RiDeleteBinLine,
  RiLoader4Line,
  RiArrowLeftLine,
  RiArrowRightLine,
} from "react-icons/ri";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
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

export default function History() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deletingId, setDeletingId] = useState(null);

  const load = async (p = 1) => {
    setLoading(true);
    try {
      const res = await getSessions(p);
      setSessions(res.data.sessions);
      setTotalPages(res.data.pages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(page);
  }, [page]);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    setDeletingId(id);
    try {
      await deleteSession(id);
      setSessions((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <Navbar />

      <div className="pt-28 pb-16 px-6 max-w-5xl mx-auto">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium px-4 py-1.5 rounded-full mb-4">
            <RiHistoryLine size={12} />
            Session History
          </div>
          <h1 className="text-3xl font-bold mb-3">Your Translation History</h1>
          <p className="text-gray-400">
            All your past sign language interpretation sessions are saved here.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <RiLoader4Line size={28} className="animate-spin text-indigo-400" />
          </div>
        ) : sessions.length === 0 ? (
          <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-2xl">
            <RiHistoryLine size={36} className="text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 font-medium mb-2">No sessions yet</p>
            <p className="text-gray-600 text-sm mb-6">
              Complete an interpretation session and save it to see it here.
            </p>
            <button
              onClick={() => navigate("/interpreter")}
              className="text-indigo-400 text-sm hover:text-indigo-300 transition-colors"
            >
              Start your first session
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {sessions.map((session) => (
              <div
                key={session.id}
                onClick={() => navigate(`/history/${session.id}`)}
                className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 hover:border-indigo-500/20 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium mb-3 line-clamp-2 group-hover:text-indigo-300 transition-colors">
                      {session.translation}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <RiTranslate2 size={13} />
                        {session.word_count} words
                      </span>
                      <span className="flex items-center gap-1.5">
                        <RiTimeLine size={13} />
                        {formatDuration(session.duration_seconds)}
                      </span>
                      <span>{formatDate(session.created_at)}</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleDelete(e, session.id)}
                    className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-red-500/10 border border-white/10 hover:border-red-500/20 text-gray-500 hover:text-red-400 flex items-center justify-center transition-all flex-shrink-0"
                  >
                    {deletingId === session.id ? (
                      <RiLoader4Line size={15} className="animate-spin" />
                    ) : (
                      <RiDeleteBinLine size={15} />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-all disabled:opacity-30"
            >
              <RiArrowLeftLine size={16} />
            </button>
            <span className="text-sm text-gray-400">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-all disabled:opacity-30"
            >
              <RiArrowRightLine size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}