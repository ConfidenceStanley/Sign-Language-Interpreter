import { useRef, useState } from "react";
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import api from "../services/api";

export default function useImageDetection() {
  const landmarkerRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const init = async () => {
    if (landmarkerRef.current) return;
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );
    landmarkerRef.current = await HandLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
      },
      runningMode: "IMAGE",
      numHands: 1,
    });
  };

  const detectFromImage = async (imageElement) => {
    setLoading(true);
    try {
      await init();

      const result = landmarkerRef.current.detect(imageElement);
      if (!result.landmarks || result.landmarks.length === 0) {
        return { landmarks: [], gestures: [] };
      }

      const landmarks = result.landmarks[0].map(lm => ({ x: lm.x, y: lm.y, z: lm.z }));
      const res = await api.post("/predict/sign", { landmarks });

      return {
        landmarks: result.landmarks,
        gestures: [[{
          categoryName: res.data.sign,
          score: res.data.confidence,
        }]],
      };
    } catch (err) {
      console.error("Image detection error:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, detectFromImage };
}