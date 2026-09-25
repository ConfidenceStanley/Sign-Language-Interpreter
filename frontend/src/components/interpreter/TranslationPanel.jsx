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
      <div className="bg-surface border border-border-subtle rounded-2xl p-5">
        <p className="text-xs text-txt-muted font-medium uppercase tracking-wider mb-3">
          Current Sign
        </p>
        <div className="flex items-end gap-3 min-h-16">
          {currentSign ? (
            <>
              <div className="text-3xl font-bold text-txt tracking-tight">
                {currentSign}
              </div>
              <div className="mb-1">
                <div className="text-xs text-txt-muted mb-1">Confidence</div>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                      style={{ width: `${confidence}%` }}
                    />
                  </div>
                  <span className="text-xs text-txt-secondary">{confidence}%</span>
                </div>
              </div>
            </>
          ) : (
            <span className="text-txt-muted text-sm">
              No sign detected. Show your hand to the camera.
            </span>
          )}
        </div>
      </div>

      <div className="bg-surface border border-border-subtle rounded-2xl p-5 flex-1">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-txt-muted font-medium uppercase tracking-wider">
            Translation
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={removeLastWord}
              className="w-8 h-8 rounded-lg bg-surface-hover hover:bg-surface border border-border text-txt-secondary hover:text-txt flex items-center justify-center transition-all"
              title="Remove last sign"
            >
              <RiDeleteBackLine size={15} />
            </button>
            <button
              onClick={handleCopy}
              className="w-8 h-8 rounded-lg bg-surface-hover hover:bg-surface border border-border text-txt-secondary hover:text-txt flex items-center justify-center transition-all"
              title="Copy"
            >
              {copied
                ? <RiCheckLine size={15} className="text-green-500" />
                : <RiFileCopyLine size={15} />}
            </button>
            <button
              onClick={clearSentence}
              className="w-8 h-8 rounded-lg bg-surface-hover hover:bg-red-500/10 border border-border hover:border-red-500/20 text-txt-secondary hover:text-red-500 flex items-center justify-center transition-all"
              title="Clear all"
            >
              <RiDeleteBinLine size={15} />
            </button>
          </div>
        </div>

        <div className="min-h-[120px] text-txt text-lg leading-relaxed font-medium">
          {sentence || (
            <span className="text-txt-muted text-base font-normal">
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

      <div className="bg-surface border border-border-subtle rounded-2xl p-4">
        <p className="text-xs text-txt-muted mb-2">Supported Gestures</p>
        <div className="flex flex-wrap gap-2">
          {["Thumb Up", "Thumb Down", "Open Palm", "Closed Fist", "Victory", "Pointing Up", "I Love You"].map((g) => (
            <span
              key={g}
              className="text-xs px-2.5 py-1 bg-surface border border-border text-txt-secondary rounded-lg"
            >
              {g}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}