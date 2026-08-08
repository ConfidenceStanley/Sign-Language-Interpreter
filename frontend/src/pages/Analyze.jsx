import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { SignProvider, useSign } from "../context/SignContext";
import TranslationPanel from "../components/interpreter/TranslationPanel";
import LandmarkCanvas from "../components/camera/LandmarkCanvas";
import useImageDetection from "../hooks/useImageDetection";
import Button from "../components/ui/Button";
import {
  RiUploadCloud2Line,
  RiSearchLine,
  RiCloseLine,
  RiImageLine,
  RiCheckLine,
  RiErrorWarningLine,
  RiArrowLeftLine,
  RiLightbulbLine,
} from "react-icons/ri";

const GESTURE_MAP = {
  "Thumb_Up": "THUMB UP",
  "Thumb_Down": "THUMB DOWN",
  "Open_Palm": "OPEN PALM",
  "Closed_Fist": "CLOSED FIST",
  "Victory": "VICTORY",
  "Pointing_Up": "POINTING UP",
  "ILoveYou": "I LOVE YOU",
};

const tips = [
  "Make sure the hand is clearly visible and well lit",
  "The hand should be the main subject of the image",
  "Plain or simple backgrounds work best",
  "Avoid blurry or low resolution images",
  "One hand per image gives the best results",
];

function AnalyzeContent() {
  const { pushSign } = useSign();
  const { detectFromImage } = useImageDetection();
  const fileInputRef = useRef(null);
  const imgRef = useRef(null);

  const [preview, setPreview] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [landmarks, setLandmarks] = useState([]);
  const [imgSize, setImgSize] = useState({ w: 960, h: 540 });
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Image is too large. Maximum size is 10MB.");
      return;
    }
    setError("");
    setResult(null);
    setLandmarks([]);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleAnalyze = async () => {
    if (!preview || !imgRef.current) return;
    setAnalyzing(true);
    setError("");
    setResult(null);

    try {
      const detectionResult = await detectFromImage(imgRef.current);

      if (!detectionResult || detectionResult.gestures?.length === 0) {
        setError(
          "No hand detected in this image. Try a clearer image with your hand clearly visible against a plain background."
        );
        setLandmarks([]);
        return;
      }

      const gesture = detectionResult.gestures[0][0];
      const mappedSign =
        GESTURE_MAP[gesture.categoryName] ||
        gesture.categoryName.replace(/_/g, " ");
      const confidence = Math.round(gesture.score * 100);

      setResult({ sign: mappedSign, confidence });
      setLandmarks(detectionResult.landmarks || []);

      if (imgRef.current) {
        setImgSize({
          w: imgRef.current.naturalWidth || 960,
          h: imgRef.current.naturalHeight || 540,
        });
      }

      pushSign(gesture.categoryName, gesture.score);
    } catch (err) {
      setError("Analysis failed. Please try again with a different image.");
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleClear = () => {
    setPreview(null);
    setResult(null);
    setError("");
    setLandmarks([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <Navbar />

      <div className="pt-24 pb-10 px-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <Link
            to="/interpreter"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors"
          >
            <RiArrowLeftLine size={16} />
            Back to Live Interpreter
          </Link>

          <div className="inline-flex items-center gap-2 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium px-4 py-1.5 rounded-full mb-4">
            Image Analysis
          </div>
          <h1 className="text-3xl font-bold mb-2">Analyze a Sign Image</h1>
          <p className="text-gray-400 max-w-2xl text-sm">
            Upload a photo of someone performing an ASL sign. The AI will
            detect the hand landmarks and identify the gesture instantly.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6 items-start">
          <div className="space-y-4">
            <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-white font-semibold text-lg">
                    Upload Image
                  </h3>
                  <p className="text-sm text-gray-400">
                    JPG, PNG or WEBP up to 10MB
                  </p>
                </div>
                {preview && (
                  <button
                    onClick={handleClear}
                    className="w-9 h-9 rounded-xl bg-white/[0.05] hover:bg-red-500/10 border border-white/10 hover:border-red-500/20 text-gray-400 hover:text-red-400 flex items-center justify-center transition-all"
                  >
                    <RiCloseLine size={18} />
                  </button>
                )}
              </div>

              {!preview ? (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-full aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                    dragOver
                      ? "border-indigo-500 bg-indigo-500/10"
                      : "border-white/10 hover:border-indigo-500/40 hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="w-16 h-16 bg-indigo-600/15 rounded-2xl flex items-center justify-center mb-4">
                    <RiUploadCloud2Line size={28} className="text-indigo-400" />
                  </div>
                  <p className="text-white font-semibold mb-1">
                    Drop your image here
                  </p>
                  <p className="text-sm text-gray-500">or click to browse files</p>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFile(e.target.files[0])}
                  />
                </div>
              ) : (
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#05070b] border border-white/5">
                  <img
                    ref={imgRef}
                    src={preview}
                    alt="Uploaded sign"
                    className="w-full h-full object-contain"
                    crossOrigin="anonymous"
                  />

                  {landmarks.length > 0 && (
                    <LandmarkCanvas
                      landmarks={landmarks}
                      width={imgSize.w}
                      height={imgSize.h}
                    />
                  )}

                  {result && (
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3">
                      <div className="text-xs text-gray-400 mb-0.5">
                        Detected Sign
                      </div>
                      <div className="text-2xl font-bold text-white">
                        {result.sign}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-500 rounded-full"
                            style={{ width: `${result.confidence}%` }}
                          />
                        </div>
                        <span className="text-xs text-indigo-400">
                          {result.confidence}%
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {error && (
                <div className="mt-4 flex items-start gap-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
                  <RiErrorWarningLine size={18} className="flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {result && (
                <div className="mt-4 flex items-center gap-3 bg-green-500/10 border border-green-500/20 text-green-400 text-sm px-4 py-3 rounded-xl">
                  <RiCheckLine size={18} className="flex-shrink-0" />
                  <span>
                    Sign detected and added to your translation panel on the right.
                  </span>
                </div>
              )}

              {preview && (
                <div className="mt-4 flex gap-3">
                  <Button
                    onClick={handleAnalyze}
                    loading={analyzing}
                    className="flex-1 justify-center gap-2"
                  >
                    <RiSearchLine size={16} />
                    {analyzing ? "Analyzing" : "Analyze Sign"}
                  </Button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 text-gray-400 hover:text-white text-sm transition-all flex items-center gap-2"
                  >
                    <RiImageLine size={15} />
                    Change
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFile(e.target.files[0])}
                    />
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5">
              <div className="flex items-center gap-2.5 mb-4">
                <RiLightbulbLine size={18} className="text-amber-400" />
                <h4 className="text-white font-medium">Tips for best results</h4>
              </div>
              <ul className="space-y-2.5">
                {tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-400">
                    <span className="w-5 h-5 bg-amber-600/15 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs text-amber-400 font-medium">
                      {i + 1}
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <TranslationPanel />
        </div>
      </div>
    </div>
  );
}

export default function Analyze() {
  return (
    <SignProvider>
      <AnalyzeContent />
    </SignProvider>
  );
}