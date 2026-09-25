import { useState } from "react";
import { RiArrowRightLine, RiImageLine } from "react-icons/ri";

export default function SignCard({ sign, onClick }) {
  const [imgError, setImgError] = useState(false);

  const categoryColors = {
    Alphabet: "bg-indigo-600/15 text-indigo-600 border-indigo-500/20",
    Greetings: "bg-green-600/15 text-green-600 border-green-500/20",
    "Common Phrases": "bg-amber-600/15 text-amber-500 border-amber-500/20",
    "Common Words": "bg-blue-600/15 text-blue-600 border-blue-500/20",
  };

  const colorClass = categoryColors[sign.category] || "bg-surface-hover text-txt-secondary border-border";

  return (
    <button
      onClick={() => onClick(sign)}
      className="w-full text-left bg-surface border border-border-subtle rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all duration-300 group cursor-pointer"
    >
      <div className="w-full h-44 bg-bg-alt border-b border-border-subtle flex items-center justify-center overflow-hidden">
        {sign.image_url && !imgError ? (
          <img
            src={sign.image_url}
            alt={`ASL sign for ${sign.name}`}
            onError={() => setImgError(true)}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-txt-muted">
            <RiImageLine size={28} />
            <span className="text-4xl font-bold text-txt-secondary">{sign.name.charAt(0)}</span>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-txt font-semibold text-lg">{sign.name}</h3>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${colorClass}`}>
            {sign.category}
          </span>
        </div>

        <p className="text-sm text-txt-secondary leading-relaxed line-clamp-2 mb-4">
          {sign.description}
        </p>

        <div className="flex items-center gap-1.5 text-indigo-600 text-sm font-medium group-hover:gap-2.5 transition-all duration-300">
          <span>Learn this sign</span>
          <RiArrowRightLine size={14} />
        </div>
      </div>
    </button>
  );
}