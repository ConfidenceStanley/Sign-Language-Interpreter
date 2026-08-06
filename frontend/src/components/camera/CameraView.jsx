import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import useHandDetection from "../../hooks/useHandDetection";
import LandmarkCanvas from "./LandmarkCanvas";
import { useSign } from "../../context/SignContext";
import {
  RiCameraLine,
  RiCameraOffLine,
  RiLoader4Line,
  RiWifiLine,
} from "react-icons/ri";

export default function CameraView() {
  const webcamRef = useRef(null);
  const animationRef = useRef(null);
  const { ready, detect } = useHandDetection();
  const { pushSign } = useSign();
  const [landmarks, setLandmarks] = useState([]);
  const [cameraOn, setCameraOn] = useState(true);
  const [handsCount, setHandsCount] = useState(0);

  useEffect(() => {
    const run = () => {
      const video = webcamRef.current?.video;

      if (ready && cameraOn && video && video.readyState === 4) {
        const results = detect(video);

        if (results) {
          setLandmarks(results.landmarks || []);
          setHandsCount(results.landmarks?.length || 0);

          if (results.gestures?.length > 0) {
            const top = results.gestures[0][0];
            pushSign(top.categoryName, top.score);
          }
        }
      }

      animationRef.current = requestAnimationFrame(run);
    };

    animationRef.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(animationRef.current);
  }, [ready, detect, cameraOn, pushSign]);

  return (
    <div className="w-full">
      <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-white font-semibold text-lg">Live Camera</h3>
            <p className="text-sm text-gray-400">
              Position your hands clearly in the frame and sign
            </p>
          </div>

          <button
            onClick={() => setCameraOn((prev) => !prev)}
            className="w-11 h-11 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 text-white flex items-center justify-center transition-all"
          >
            {cameraOn ? <RiCameraLine size={20} /> : <RiCameraOffLine size={20} />}
          </button>
        </div>

        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#05070b] border border-white/5">
          {cameraOn ? (
            <>
              <Webcam
                ref={webcamRef}
                audio={false}
                mirrored
                className="w-full h-full object-cover"
                videoConstraints={{ width: 960, height: 540, facingMode: "user" }}
              />
              <LandmarkCanvas landmarks={landmarks} width={960} height={540} />

              <div className="absolute top-3 right-3">
                <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium ${handsCount > 0 ? "bg-green-500/15 border border-green-500/20 text-green-400" : "bg-white/5 border border-white/10 text-gray-400"}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${handsCount > 0 ? "bg-green-400 animate-pulse" : "bg-gray-500"}`} />
                  {handsCount > 0 ? `${handsCount} hand${handsCount > 1 ? "s" : ""} detected` : "No hands detected"}
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <div className="flex flex-col items-center gap-3">
                <RiCameraOffLine size={32} />
                <p className="text-sm">Camera is off</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <div className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/5 text-sm text-gray-300 flex items-center gap-2">
            {ready
              ? <RiWifiLine size={16} className="text-green-400" />
              : <RiLoader4Line size={16} className="animate-spin text-indigo-400" />}
            {ready ? "Model loaded and ready" : "Loading AI model"}
          </div>
        </div>
      </div>
    </div>
  );
}