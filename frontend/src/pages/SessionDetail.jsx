import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { getSessionById } from "../services/sessionService";
import useSpeech from "../hooks/useSpeech";
import Button from "../components/ui/Button";
import {
  RiArrowLeftLine,
  RiTimeLine,
  RiTranslate2,
  RiHandHeartLine,
  RiVolumeUpLine,
  RiFileCopyLine,
  RiCheckLine,
  RiLoader4Line,
} from "react-icons/ri";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDuration(seconds) {
  if (seconds < 60) return `${seconds} seconds`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins} minute${mins > 1 ? "s" : ""} ${secs} seconds`;
}

export default function SessionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const { speak, speaking } = useSpeech();

  useEffect(() => {
    getSessionById(id)
      .then((res) => setSession(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(session.translation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <RiLoader4Line size={28} className="animate-spin text-indigo-400" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center text-white">
        Session not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <Navbar />

      <div className="pt-28 pb-16 px-6 max-w-3xl mx-auto">
        <button
          onClick={() => navigate("/history")}
          className="flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors"
        >
          <RiArrowLeftLine size={16} />
          Back to history
        </button>

        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Session Detail</h1>
          <p className="text-gray-400 text-sm">{formatDate(session.created_at)}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-center">
            <RiTranslate2 size={18} className="text-indigo-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">{session.word_count}</div>
            <div className="text-xs text-gray-500">Words</div>
          </div>
          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-center">
            <RiHandHeartLine size={18} className="text-green-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">{session.signs_detected.length}</div>
            <div className="text-xs text-gray-500">Signs</div>
          </div>
          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-center">
            <RiTimeLine size={18} className="text-amber-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">
              {Math.floor(session.duration_seconds / 60) || session.duration_seconds}
            </div>
            <div className="text-xs text-gray-500">
              {session.duration_seconds >= 60 ? "Minutes" : "Seconds"}
            </div>
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Translation</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-all"
              >
                {copied ? <RiCheckLine size={15} className="text-green-400" /> : <RiFileCopyLine size={15} />}
              </button>
            </div>
          </div>

          <p className="text-white text-lg leading-relaxed">{session.translation}</p>

          <Button
            onClick={() => speak(session.translation)}
            variant="secondary"
            loading={speaking}
            className="mt-5 gap-2 w-full justify-center"
          >
            <RiVolumeUpLine size={16} />
            {speaking ? "Speaking" : "Read Aloud"}
          </Button>
        </div>

        {session.signs_detected.length > 0 && (
          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
            <h3 className="font-semibold text-white mb-4">Signs Detected</h3>
            <div className="flex flex-wrap gap-2">
              {session.signs_detected.map((sign, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-indigo-600/15 border border-indigo-500/20 text-indigo-300 text-sm rounded-lg font-medium"
                >
                  {sign}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}