import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";
import Navbar from "../components/layout/Navbar";
import {
  RiCameraLine,
  RiTranslate2,
  RiVolumeUpLine,
  RiArrowRightLine,
  RiHandHeartLine,
  RiBookOpenLine,
  RiTimeLine,
  RiShieldCheckLine,
  RiGlobalLine,
  RiGroupLine,
  RiStarLine,
  RiSignalTowerLine,
} from "react-icons/ri";

const features = [
  {
    icon: RiCameraLine,
    title: "Real Time Detection",
    description:
      "Our advanced computer vision system captures and analyzes hand gestures instantly through your device camera with high precision tracking.",
  },
  {
    icon: RiTranslate2,
    title: "AI Powered Interpretation",
    description:
      "A deep learning model trained on thousands of ASL signs accurately translates your gestures into readable text in real time.",
  },
  {
    icon: RiVolumeUpLine,
    title: "Voice Output",
    description:
      "Interpreted signs are converted to natural speech instantly, enabling smooth and effortless two way communication.",
  },
  {
    icon: RiBookOpenLine,
    title: "Sign Dictionary",
    description:
      "Browse and learn from a comprehensive library of ASL signs with visual guides, descriptions, and practice mode.",
  },
  {
    icon: RiTimeLine,
    title: "Session History",
    description:
      "Every interpretation session is saved automatically so you can review past translations and track your communication history.",
  },
  {
    icon: RiHandHeartLine,
    title: "Practice Mode",
    description:
      "Learn new signs at your own pace with interactive practice sessions and instant feedback on your sign accuracy.",
  },
];

const stats = [
  { value: "26+", label: "ASL Letter Signs" },
  { value: "50+", label: "Word Signs" },
  { value: "Real Time", label: "Processing Speed" },
  { value: "95%+", label: "Target Accuracy" },
];

const steps = [
  {
    number: "01",
    title: "Open Your Camera",
    description:
      "Grant camera access and position yourself in front of your device so your hands are clearly visible.",
  },
  {
    number: "02",
    title: "Start Signing",
    description:
      "Perform ASL signs naturally. The AI system detects and tracks your hand movements in real time.",
  },
  {
    number: "03",
    title: "See and Hear the Translation",
    description:
      "Your signs are instantly converted to text on screen and spoken aloud through your device speakers.",
  },
];

export default function Landing() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-bg text-txt">
      <Navbar />

      {/* ── Hero ── */}
      <section className="pt-36 pb-20 px-6 max-w-6xl mx-auto text-center relative">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-indigo-600/10 border border-indigo-500/20 text-indigo-600 text-xs font-medium px-4 py-1.5 rounded-full mb-8">
            <RiStarLine size={12} />
            AI Powered Sign Language Interpreter
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6 max-w-4xl mx-auto">
            Communication without
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              {" "}
              boundaries
            </span>
          </h1>

          <p className="text-txt-secondary text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            SignBridge uses artificial intelligence and computer vision to
            interpret American Sign Language in real time, converting hand
            gestures into text and speech for seamless communication between the
            deaf community and the hearing world.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={user ? "/dashboard" : "/register"}>
              <Button className="gap-2 px-8 py-3.5 text-base">
                Get Started Free
                <RiArrowRightLine size={18} />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="secondary" className="px-8 py-3.5 text-base">
                See How It Works
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 px-6 border-y border-border bg-bg-alt">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-txt mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-txt-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-surface border border-border text-txt-secondary text-xs font-medium px-4 py-1.5 rounded-full mb-4">
            Simple Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-txt mb-4">
            How SignBridge Works
          </h2>
          <p className="text-txt-secondary max-w-xl mx-auto">
            Three simple steps to bridge the communication gap between sign
            language users and the hearing world.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="bg-surface border border-border rounded-2xl p-8 hover:border-indigo-500/30 transition-all duration-300 h-full">
                <div className="text-5xl font-bold text-indigo-600/20 mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-txt mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-txt-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-surface border border-border text-txt-secondary text-xs font-medium px-4 py-1.5 rounded-full mb-4">
            Features
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-txt mb-4">
            Everything You Need
          </h2>
          <p className="text-txt-secondary max-w-xl mx-auto">
            A complete suite of tools designed to make sign language
            communication accessible, accurate, and effortless for everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-surface border border-border rounded-2xl p-7 hover:border-indigo-500/30 transition-all duration-300 group"
            >
              <div className="w-11 h-11 bg-indigo-600/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-indigo-600/20 transition-colors duration-300">
                <f.icon size={20} className="text-indigo-500" />
              </div>
              <h3 className="font-semibold text-txt mb-2.5">{f.title}</h3>
              <p className="text-sm text-txt-secondary leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-surface border border-border text-txt-secondary text-xs font-medium px-4 py-1.5 rounded-full mb-4">
            Our Mission
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-txt mb-4">
            Why SignBridge Exists
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-surface border border-border rounded-2xl p-7">
            <div className="w-11 h-11 bg-green-600/10 rounded-xl flex items-center justify-center mb-5">
              <RiGlobalLine size={20} className="text-green-600" />
            </div>
            <h3 className="font-semibold text-txt mb-2.5">
              Accessibility First
            </h3>
            <p className="text-sm text-txt-secondary leading-relaxed">
              Over 70 million deaf people worldwide face communication barriers
              daily. SignBridge is built to break those barriers using
              technology that is free and accessible to everyone.
            </p>
          </div>

          <div className="bg-surface border border-border rounded-2xl p-7">
            <div className="w-11 h-11 bg-blue-600/10 rounded-xl flex items-center justify-center mb-5">
              <RiGroupLine size={20} className="text-blue-600" />
            </div>
            <h3 className="font-semibold text-txt mb-2.5">
              Inclusive Communication
            </h3>
            <p className="text-sm text-txt-secondary leading-relaxed">
              Whether in schools, hospitals, workplaces, or everyday life,
              SignBridge enables deaf and hearing individuals to communicate
              naturally without the need for a human interpreter.
            </p>
          </div>

          <div className="bg-surface border border-border rounded-2xl p-7">
            <div className="w-11 h-11 bg-purple-600/10 rounded-xl flex items-center justify-center mb-5">
              <RiShieldCheckLine size={20} className="text-purple-600" />
            </div>
            <h3 className="font-semibold text-txt mb-2.5">AI for Good</h3>
            <p className="text-sm text-txt-secondary leading-relaxed">
              We believe artificial intelligence should serve humanity.
              SignBridge demonstrates how machine learning and computer vision
              can create meaningful impact in the lives of people with
              disabilities.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-b from-indigo-600/10 to-transparent border border-indigo-500/20 rounded-3xl py-16 px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-txt mb-4">
            Ready to bridge the communication gap?
          </h2>
          <p className="text-txt-secondary max-w-lg mx-auto mb-8">
            Join SignBridge today and experience real time sign language
            interpretation powered by artificial intelligence. Free to use,
            always.
          </p>
          <Link to={user ? "/dashboard" : "/register"}>
            <Button className="gap-2 px-8 py-3.5 text-base mx-auto">
              Start Interpreting Now
              <RiArrowRightLine size={18} />
            </Button>
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
              <RiSignalTowerLine size={14} className="text-white" />
            </div>
            <span className="font-semibold text-txt text-sm">SignBridge</span>
          </div>
          <p className="text-xs text-txt-muted text-center">
            HND Final Year Project | Software and Web Development
          </p>
          <p className="text-xs text-txt-muted">
            Built with React, FastAPI, TensorFlow
          </p>
        </div>
      </footer>
    </div>
  );
}