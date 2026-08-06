import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";
import Navbar from "../components/layout/Navbar";
import { RiCameraLine, RiTranslate2, RiVolumeUpLine, RiArrowRightLine } from "react-icons/ri";

const features = [
  {
    icon: RiCameraLine,
    title: "Real-time Detection",
    description: "Advanced computer vision detects and tracks hand gestures instantly through your camera.",
  },
  {
    icon: RiTranslate2,
    title: "AI Interpretation",
    description: "Deep learning model trained on thousands of ASL signs translates gestures to text accurately.",
  },
  {
    icon: RiVolumeUpLine,
    title: "Voice Output",
    description: "Interpreted text is spoken aloud in real time, enabling seamless communication.",
  },
];

export default function Landing() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <Navbar />

      <section className="pt-40 pb-24 px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium px-4 py-1.5 rounded-full mb-8">
          ASL Sign Language Interpreter
        </div>

        <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
          Bridging the gap between
          <span className="text-indigo-400"> signing </span>
          and speaking
        </h1>

        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          SignBridge uses artificial intelligence to interpret American Sign Language in real time,
          converting gestures into text and speech for effortless communication.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link to={user ? "/dashboard" : "/register"}>
            <Button className="gap-2 px-6 py-3 text-base">
              Start Interpreting
              <RiArrowRightLine size={18} />
            </Button>
          </Link>
          <Link to="/dictionary">
            <Button variant="secondary" className="px-6 py-3 text-base">
              Browse Signs
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 hover:border-indigo-500/30 transition-all duration-300"
            >
              <div className="w-10 h-10 bg-indigo-600/15 rounded-xl flex items-center justify-center mb-4">
                <f.icon size={20} className="text-indigo-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/5 py-8 px-6 text-center text-xs text-gray-600">
        SignBridge — HND Final Year Project · Software & Web Development
      </footer>
    </div>
  );
}