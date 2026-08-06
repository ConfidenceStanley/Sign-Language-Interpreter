import { RiArrowRightLine } from "react-icons/ri";

export default function SignCard({ sign, onClick }) {
  const categoryColors = {
    Alphabet: "bg-indigo-600/15 text-indigo-400 border-indigo-500/20",
    Greetings: "bg-green-600/15 text-green-400 border-green-500/20",
    "Common Phrases": "bg-amber-600/15 text-amber-400 border-amber-500/20",
    "Common Words": "bg-blue-600/15 text-blue-400 border-blue-500/20",
  };

  const colorClass = categoryColors[sign.category] || "bg-white/10 text-gray-400 border-white/10";

  return (
    <button
      onClick={() => onClick(sign)}
      className="w-full text-left bg-white/[0.03] border border-white/5 rounded-2xl p-5 hover:border-indigo-500/20 transition-all duration-300 group cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-14 h-14 bg-white/[0.04] border border-white/10 rounded-xl flex items-center justify-center text-2xl font-bold text-white">
          {sign.name.charAt(0)}
        </div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${colorClass}`}>
          {sign.category}
        </span>
      </div>

      <h3 className="text-white font-semibold text-lg mb-1.5">{sign.name}</h3>
      <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mb-4">{sign.description}</p>

      <div className="flex items-center gap-1.5 text-indigo-400 text-sm font-medium group-hover:gap-2.5 transition-all duration-300">
        <span>Learn this sign</span>
        <RiArrowRightLine size={14} />
      </div>
    </button>
  );
}