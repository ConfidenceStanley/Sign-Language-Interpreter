import { useEffect, useRef, useState } from "react";
import { FilesetResolver, GestureRecognizer } from "@mediapipe/tasks-vision";

export default function useHandDetection() {
  const recognizerRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadModel() {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );

      const recognizer = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "/models/gesture_recognizer.task",
        },
        runningMode: "VIDEO",
        numHands: 2,
      });

      if (mounted) {
        recognizerRef.current = recognizer;
        setReady(true);
      }
    }

    loadModel();

    return () => {
      mounted = false;
    };
  }, []);

  const detect = (video) => {
    if (!ready || !video || !recognizerRef.current) return null;
    return recognizerRef.current.recognizeForVideo(video, performance.now());
  };

  return { ready, detect };
}