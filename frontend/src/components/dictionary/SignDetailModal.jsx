import { RiCloseLine, RiHandHeartLine } from "react-icons/ri";

export default function SignDetailModal({ sign, onClose }) {
  if (!sign) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-[#12121a] border border-white/10 rounded-3xl p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-all"
        >
          <RiCloseLine size={20} />
        </button>

        <div className="w-16 h-16 bg-indigo-600/15 rounded-2xl flex items-center justify-center mb-6">
          <span className="text-3xl font-bold text-indigo-400">{sign.name.charAt(0)}</span>
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">{sign.name}</h2>

        <span className="inline-block text-xs font-medium px-3 py-1.5 rounded-full bg-indigo-600/15 text-indigo-400 border border-indigo-500/20 mb-6">
          {sign.category}
        </span>

        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">
            Description
          </h4>
          <p className="text-gray-300 leading-relaxed">{sign.description}</p>
        </div>

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
  );
}