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
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <RiLoader4Line size={28} className="animate-spin text-indigo-500" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center text-txt">
        Session not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-txt">
      <Navbar />

      <div className="pt-28 pb-16 px-6 max-w-3xl mx-auto">
        <button
          onClick={() => navigate("/history")}
          className="flex items-center gap-2 text-txt-secondary hover:text-txt text-sm mb-8 transition-colors"
        >
          <RiArrowLeftLine size={16} />
          Back to history
        </button>

        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Session Detail</h1>
          <p className="text-txt-secondary text-sm">{formatDate(session.created_at)}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-surface border border-border-subtle rounded-2xl p-4 text-center">
            <RiTranslate2 size={18} className="text-indigo-500 mx-auto mb-2" />
            <div className="text-xl font-bold text-txt">{session.word_count}</div>
            <div className="text-xs text-txt-muted">Words</div>
          </div>
          <div className="bg-surface border border-border-subtle rounded-2xl p-4 text-center">
            <RiHandHeartLine size={18} className="text-green-500 mx-auto mb-2" />
            <div className="text-xl font-bold text-txt">{session.signs_detected.length}</div>
            <div className="text-xs text-txt-muted">Signs</div>
          </div>
          <div className="bg-surface border border-border-subtle rounded-2xl p-4 text-center">
            <RiTimeLine size={18} className="text-amber-500 mx-auto mb-2" />
            <div className="text-xl font-bold text-txt">
              {Math.floor(session.duration_seconds / 60) || session.duration_seconds}
            </div>
            <div className="text-xs text-txt-muted">
              {session.duration_seconds >= 60 ? "Minutes" : "Seconds"}
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border-subtle rounded-2xl p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-txt">Translation</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="w-9 h-9 rounded-xl bg-surface-hover border border-border text-txt-secondary hover:text-txt flex items-center justify-center transition-all"
              >
                {copied ? <RiCheckLine size={15} className="text-green-500" /> : <RiFileCopyLine size={15} />}
              </button>
            </div>
          </div>

          <p className="text-txt text-lg leading-relaxed">{session.translation}</p>

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
          <div className="bg-surface border border-border-subtle rounded-2xl p-6">
            <h3 className="font-semibold text-txt mb-4">Signs Detected</h3>
            <div className="flex flex-wrap gap-2">
              {session.signs_detected.map((sign, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-indigo-600/15 border border-indigo-500/20 text-indigo-600 text-sm rounded-lg font-medium"
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