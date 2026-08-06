import { useRef, useState } from "react";
import Navbar from "../components/layout/Navbar";
import CameraView from "../components/camera/CameraView";
import TranslationPanel from "../components/interpreter/TranslationPanel";
import { SignProvider, useSign } from "../context/SignContext";
import { endSession } from "../services/sessionService";
import Button from "../components/ui/Button";
import { RiSaveLine, RiCheckLine } from "react-icons/ri";

function InterpreterContent() {
  const { sentence, currentSign } = useSign();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const startTimeRef = useRef(Date.now());
  const signsLogRef = useRef([]);

  if (currentSign && !signsLogRef.current.includes(currentSign)) {
    signsLogRef.current.push(currentSign);
  }

  const handleSaveSession = async () => {
    if (!sentence.trim()) return;
    setSaving(true);
    try {
      const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
      await endSession({
        translation: sentence,
        signs_detected: signsLogRef.current,
        duration_seconds: duration,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <Navbar />
      <div className="pt-24 pb-10 px-6 max-w-7xl mx-auto">
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium px-4 py-1.5 rounded-full mb-4">
              Live Interpreter
            </div>
            <h1 className="text-3xl font-bold mb-2">Sign Language Interpreter</h1>
            <p className="text-gray-400 max-w-2xl text-sm">
              Show your hands to the camera and sign in ASL. The AI model detects
              your gestures and converts them to text and speech in real time.
            </p>
          </div>

          <Button
            onClick={handleSaveSession}
            variant="secondary"
            loading={saving}
            disabled={!sentence.trim()}
            className="gap-2 self-start mt-1"
          >
            {saved ? (
              <>
                <RiCheckLine size={16} className="text-green-400" />
                <span className="text-green-400">Session Saved</span>
              </>
            ) : (
              <>
                <RiSaveLine size={16} />
                Save Session
              </>
            )}
          </Button>
        </div>

        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6 items-start">
          <CameraView />
          <TranslationPanel />
        </div>
      </div>
    </div>
  );
}

export default function Interpreter() {
  return (
    <SignProvider>
      <InterpreterContent />
    </SignProvider>
  );
}