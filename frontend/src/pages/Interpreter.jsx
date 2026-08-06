import Navbar from "../components/layout/Navbar";
import CameraView from "../components/camera/CameraView";
import {
  RiSparklingLine,
  RiVolumeUpLine,
  RiText,
  RiHistoryLine,
} from "react-icons/ri";

const items = [
  {
    icon: RiSparklingLine,
    title: "AI Detection Active",
    text: "Hand landmarks are being tracked live in the browser for fast and smooth performance.",
  },
  {
    icon: RiText,
    title: "Text Interpretation Coming Next",
    text: "The next phase will convert detected hand landmarks into letters, words, and full text output.",
  },
  {
    icon: RiVolumeUpLine,
    title: "Speech Output Coming Next",
    text: "Detected text will be spoken aloud to make communication easier in real world conversations.",
  },
  {
    icon: RiHistoryLine,
    title: "Session History Ready for Later",
    text: "Each translation session will later be saved so users can review their communication history.",
  },
];

export default function Interpreter() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <Navbar />

      <div className="pt-28 px-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium px-4 py-1.5 rounded-full mb-4">
            Live Interpreter Workspace
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Real time hand tracking</h1>
          <p className="text-gray-400 max-w-2xl">
            This workspace captures hand movement from the camera and displays hand landmarks in real time.
            It is the foundation for sign recognition and interpretation.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.4fr_0.9fr] gap-6">
          <CameraView />

          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.title}
                className="bg-white/[0.03] border border-white/5 rounded-2xl p-5"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-600/15 flex items-center justify-center mb-4">
                  <item.icon size={18} className="text-indigo-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}