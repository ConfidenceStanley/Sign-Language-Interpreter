import Navbar from "../components/layout/Navbar";
import CameraView from "../components/camera/CameraView";
import TranslationPanel from "../components/interpreter/TranslationPanel";
import { SignProvider } from "../context/SignContext";

export default function Interpreter() {
  return (
    <SignProvider>
      <div className="min-h-screen bg-[#0a0a0f] text-white">
        <Navbar />
        <div className="pt-24 pb-10 px-6 max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium px-4 py-1.5 rounded-full mb-4">
              Live Interpreter
            </div>
            <h1 className="text-3xl font-bold mb-2">Sign Language Interpreter</h1>
            <p className="text-gray-400 max-w-2xl text-sm">
              Show your hands to the camera and sign in ASL. The AI model will
              detect your gestures, build words, and translate your signs to text
              and speech in real time.
            </p>
          </div>
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6 items-start">
            <CameraView />
            <TranslationPanel />
          </div>
        </div>
      </div>
    </SignProvider>
  );
}