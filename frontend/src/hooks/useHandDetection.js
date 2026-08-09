import { useEffect, useRef, useState } from "react";
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import api from "../services/api";

export default function useHandDetection() {
  const handLandmarkerRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState("Loading");

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );
        const handLandmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
          },
          runningMode: "VIDEO",
          numHands: 1,
        });
        if (!mounted) return;
        handLandmarkerRef.current = handLandmarker;
        setReady(true);
        setStatus("Ready");
      } catch (err) {
        console.error(err);
        setStatus("Failed to load");
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const lastPredictTime = useRef(0);
  const lastPrediction = useRef(null);

  const detect = (video) => {
    if (!handLandmarkerRef.current || !video) return null;
    const result = handLandmarkerRef.current.detectForVideo(video, performance.now());

    if (!result.landmarks || result.landmarks.length === 0) {
      lastPrediction.current = null;
      return { landmarks: [], gestures: [] };
    }

    const now = Date.now();
    if (now - lastPredictTime.current > 300) {
      lastPredictTime.current = now;
      const landmarks = result.landmarks[0].map(lm => ({ x: lm.x, y: lm.y, z: lm.z }));
      
      api.post("/predict/sign", { landmarks })
        .then(res => {
          lastPrediction.current = res.data;
        })
        .catch(err => console.error("Predict error:", err));
    }

    return {
      landmarks: result.landmarks,
      gestures: lastPrediction.current
        ? [[{ categoryName: lastPrediction.current.sign, score: lastPrediction.current.confidence }]]
        : [],
    };
  };

  return { ready, detect, status };
}