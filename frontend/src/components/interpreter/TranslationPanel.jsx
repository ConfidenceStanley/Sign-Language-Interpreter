import { useSign } from "../../context/SignContext";
import useSpeech from "../../hooks/useSpeech";
import Button from "../ui/Button";
import {
  RiVolumeUpLine,
  RiDeleteBackLine,
  RiDeleteBinLine,
  RiFileCopyLine,
  RiCheckLine,
} from "react-icons/ri";
import { useState } from "react";

export default function TranslationPanel() {
  const { currentSign, sentence, confidence, clearSentence, removeLastWord } = useSign();
  const { speak, speaking } = useSpeech();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!sentence) return;
    navigator.clipboard.writeText(sentence);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5">
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-3">
          Current Sign
        </p>
        <div className="flex items-end gap-3 min-h-16">
          {currentSign ? (
            <>
              <div className="text-3xl font-bold text-white tracking-tight">
                {currentSign}
              </div>
              <div className="mb-1">
                <div className="text-xs text-gray-500 mb-1">Confidence</div>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                      style={{ width: `${confidence}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400">{confidence}%</span>
                </div>
              </div>
            </>
          ) : (
            <span className="text-gray-600 text-sm">
              No sign detected. Show your hand to the camera.
            </span>
          )}
        </div>
      </div>

      <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 flex-1">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
            Translation
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={removeLastWord}
              className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-all"
              title="Remove last sign"
            >
              <RiDeleteBackLine size={15} />
            </button>
            <button
              onClick={handleCopy}
              className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-all"
              title="Copy"
            >
              {copied
                ? <RiCheckLine size={15} className="text-green-400" />
                : <RiFileCopyLine size={15} />}
            </button>
            <button
              onClick={clearSentence}
              className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-red-500/10 border border-white/10 hover:border-red-500/20 text-gray-400 hover:text-red-400 flex items-center justify-center transition-all"
              title="Clear all"
            >
              <RiDeleteBinLine size={15} />
            </button>
          </div>
        </div>

        <div className="min-h-[120px] text-white text-lg leading-relaxed font-medium">
          {sentence || (
            <span className="text-gray-600 text-base font-normal">
              Detected signs will appear here as you sign
            </span>
          )}
        </div>

        {sentence && (
          <Button
            onClick={() => speak(sentence)}
            variant="secondary"
            className="mt-4 gap-2 w-full justify-center"
            loading={speaking}
          >
            <RiVolumeUpLine size={16} />
            {speaking ? "Speaking" : "Speak Translation"}
          </Button>
        )}
      </div>

      <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4">
        <p className="text-xs text-gray-500 mb-2">Supported Gestures</p>
        <div className="flex flex-wrap gap-2">
          {["Thumb Up", "Thumb Down", "Open Palm", "Closed Fist", "Victory", "Pointing Up", "I Love You"].map((g) => (
            <span
              key={g}
              className="text-xs px-2.5 py-1 bg-white/[0.04] border border-white/10 text-gray-400 rounded-lg"
            >
              {g}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}