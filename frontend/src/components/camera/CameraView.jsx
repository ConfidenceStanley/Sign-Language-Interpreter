import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import useHandDetection from "../../hooks/useHandDetection";
import LandmarkCanvas from "./LandmarkCanvas";
import {
  RiCameraLine,
  RiCameraOffLine,
  RiHand,
  RiLoader4Line,
} from "react-icons/ri";

export default function CameraView() {
  const webcamRef = useRef(null);
  const animationRef = useRef(null);
  const { ready, detectHands } = useHandDetection();
  const [landmarks, setLandmarks] = useState([]);
  const [cameraOn, setCameraOn] = useState(true);

  useEffect(() => {
    const detect = () => {
      const video = webcamRef.current?.video;

      if (
        ready &&
        cameraOn &&
        video &&
        video.readyState === 4
      ) {
        const results = detectHands(video);
        setLandmarks(results?.landmarks || []);
      }

      animationRef.current = requestAnimationFrame(detect);
    };

    animationRef.current = requestAnimationFrame(detect);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [ready, detectHands, cameraOn]);

  return (
    <div className="w-full">
      <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-white font-semibold text-lg">Live Camera</h3>
            <p className="text-sm text-gray-400">
              Position your hands clearly inside the frame
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
                videoConstraints={{
                  width: 960,
                  height: 540,
                  facingMode: "user",
                }}
              />
              <LandmarkCanvas landmarks={landmarks} width={960} height={540} />
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
            {ready ? <RiHand size={16} className="text-indigo-400" /> : <RiLoader4Line size={16} className="animate-spin text-indigo-400" />}
            {ready ? "Hand detection ready" : "Loading hand model"}
          </div>

          <div className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/5 text-sm text-gray-300">
            Hands detected: <span className="text-white font-medium">{landmarks.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}