import { useState } from "react";
import { RiCloseLine, RiHandHeartLine, RiImageLine } from "react-icons/ri";

export default function SignDetailModal({ sign, onClose }) {
  const [imgError, setImgError] = useState(false);

  if (!sign) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-[#12121a] border border-white/10 rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="w-full h-64 bg-[#0d0d14] flex items-center justify-center border-b border-white/5">
          {sign.image_url && !imgError ? (
            <img
              src={sign.image_url}
              alt={`ASL sign for ${sign.name}`}
              onError={() => setImgError(true)}
              className="w-full h-full object-contain p-6"
            />
          ) : (
            <div className="flex flex-col items-center gap-3 text-gray-600">
              <RiImageLine size={36} />
              <span className="text-5xl font-bold text-gray-700">{sign.name.charAt(0)}</span>
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-black/40 hover:bg-black/60 border border-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-all backdrop-blur-sm"
        >
          <RiCloseLine size={20} />
        </button>

        <div className="p-7">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">{sign.name}</h2>
            <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-indigo-600/15 text-indigo-400 border border-indigo-500/20">
              {sign.category}
            </span>
          </div>

          <p className="text-gray-300 leading-relaxed mb-6">{sign.description}</p>

          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5">
            <div className="flex items-center gap-2.5 mb-3">
              <RiHandHeartLine size={18} className="text-indigo-400" />
              <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                How to perform this sign
              </h4>
            </div>
            <p className="text-gray-300 leading-relaxed">{sign.how_to}</p>
          </div>
        </div>
      </div>
    </div>
  );
}