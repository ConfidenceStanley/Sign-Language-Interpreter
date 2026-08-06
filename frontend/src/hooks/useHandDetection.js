import { useEffect, useRef, useState } from "react";
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";

export default function useHandDetection() {
  const handLandmarkerRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadModel() {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );

      const handLandmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
        },
        runningMode: "VIDEO",
        numHands: 2,
      });

      if (mounted) {
        handLandmarkerRef.current = handLandmarker;
        setReady(true);
      }
    }

    loadModel();

    return () => {
      mounted = false;
    };
  }, []);

  const detectHands = (video) => {
    if (!ready || !video || !handLandmarkerRef.current) return null;
    return handLandmarkerRef.current.detectForVideo(video, performance.now());
  };

  return { ready, detectHands };
}