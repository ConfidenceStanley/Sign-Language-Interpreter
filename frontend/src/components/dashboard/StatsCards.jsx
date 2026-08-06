import {
  RiHistoryLine,
  RiTranslate2,
  RiHandHeartLine,
  RiTimeLine,
} from "react-icons/ri";

function formatDuration(seconds) {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  return `${hrs}h ${mins % 60}m`;
}

export default function StatsCards({ stats, loading }) {
  const cards = [
    {
      icon: RiHistoryLine,
      label: "Total Sessions",
      value: loading ? "..." : stats?.total_sessions ?? 0,
      color: "text-indigo-400",
      bg: "bg-indigo-600/15",
    },
    {
      icon: RiTranslate2,
      label: "Words Translated",
      value: loading ? "..." : stats?.total_words ?? 0,
      color: "text-green-400",
      bg: "bg-green-600/15",
    },
    {
      icon: RiHandHeartLine,
      label: "Signs Detected",
      value: loading ? "..." : stats?.total_signs ?? 0,
      color: "text-amber-400",
      bg: "bg-amber-600/15",
    },
    {
      icon: RiTimeLine,
      label: "Time Signing",
      value: loading ? "..." : formatDuration(stats?.total_duration_seconds ?? 0),
      color: "text-blue-400",
      bg: "bg-blue-600/15",
    },
  ];

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white/[0.03] border border-white/5 rounded-2xl p-5"
        >
          <div className={`w-10 h-10 ${card.bg} rounded-xl flex items-center justify-center mb-4`}>
            <card.icon size={18} className={card.color} />
          </div>
          <div className="text-2xl font-bold text-white mb-1">{card.value}</div>
          <div className="text-sm text-gray-400">{card.label}</div>
        </div>
      ))}
    </div>
  );
}