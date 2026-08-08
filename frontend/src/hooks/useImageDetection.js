import { useRef, useState } from "react";
import { FilesetResolver, GestureRecognizer } from "@mediapipe/tasks-vision";

export default function useImageDetection() {
  const recognizerRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const initRecognizer = async () => {
    if (recognizerRef.current) return;
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );
    const recognizer = await GestureRecognizer.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: "/models/gesture_recognizer.task",
      },
      runningMode: "IMAGE",
      numHands: 2,
    });
    recognizerRef.current = recognizer;
  };

  const detectFromImage = async (imageElement) => {
    setLoading(true);
    try {
      await initRecognizer();
      const result = recognizerRef.current.recognize(imageElement);
      return result;
    } catch (err) {
      console.error("Image detection error:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, detectFromImage };
}