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
  const { currentSign, currentWord, sentence, confidence, clearSentence, removeLastWord, finalizeWord } = useSign();
  const { speak, speaking } = useSpeech();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!sentence) return;
    navigator.clipboard.writeText(sentence);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = () => {
    const text = sentence || currentWord;
    if (text) speak(text);
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5">
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-3">
          Current Sign
        </p>
        <div className="flex items-end gap-3">
          <div className="text-6xl font-bold text-white tracking-tight">
            {currentSign || <span className="text-white/10">A</span>}
          </div>
          {currentSign && (
            <div className="mb-2">
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
          )}
        </div>
      </div>

      <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5">
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-3">
          Word Being Formed
        </p>
        <div className="flex items-center gap-1 min-h-10 flex-wrap">
          {currentWord ? (
            currentWord.split("").map((letter, i) => (
              <span
                key={i}
                className="inline-flex items-center justify-center w-9 h-9 bg-indigo-600/15 border border-indigo-500/20 rounded-lg text-indigo-300 font-semibold text-sm"
              >
                {letter}
              </span>
            ))
          ) : (
            <span className="text-gray-600 text-sm">Spell letters to form a word</span>
          )}
        </div>
        {currentWord && (
          <button
            onClick={finalizeWord}
            className="mt-3 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Confirm word
          </button>
        )}
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
              title="Remove last word"
            >
              <RiDeleteBackLine size={15} />
            </button>
            <button
              onClick={handleCopy}
              className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-all"
              title="Copy"
            >
              {copied ? <RiCheckLine size={15} className="text-green-400" /> : <RiFileCopyLine size={15} />}
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

        <div className="min-h-[100px] text-white text-lg leading-relaxed font-medium">
          {sentence || (
            <span className="text-gray-600 text-base font-normal">
              Your interpreted text will appear here as you sign
            </span>
          )}
        </div>

        {(sentence || currentWord) && (
          <Button
            onClick={handleSpeak}
            variant="secondary"
            className="mt-4 gap-2 w-full justify-center"
            loading={speaking}
          >
            <RiVolumeUpLine size={16} />
            {speaking ? "Speaking" : "Speak Translation"}
          </Button>
        )}
      </div>
    </div>
  );
}