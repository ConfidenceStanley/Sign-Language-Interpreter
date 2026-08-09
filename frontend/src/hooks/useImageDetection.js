import { useRef, useState } from "react";
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import * as tflite from "@tensorflow/tfjs-tflite";

export default function useImageDetection() {
  const landmarkerRef = useRef(null);
  const modelRef = useRef(null);
  const classesRef = useRef([]);
  const [loading, setLoading] = useState(false);

  const init = async () => {
    if (landmarkerRef.current && modelRef.current) return;

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

    const classesRes = await fetch("/models/asl_classes.json");
    classesRef.current = await classesRes.json();

    tflite.setWasmPath("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-tflite/dist/");
    modelRef.current = await tflite.loadTFLiteModel("/models/asl_model.tflite");
  };

  const detectFromImage = async (imageElement) => {
    setLoading(true);
    try {
      await init();

      const result = landmarkerRef.current.detect(imageElement);
      if (!result.landmarks || result.landmarks.length === 0) {
        return { landmarks: [], gestures: [] };
      }

      const wrist = result.landmarks[0][0];
      const features = [];
      for (const lm of result.landmarks[0]) {
        features.push(lm.x - wrist.x, lm.y - wrist.y, lm.z - wrist.z);
      }

      const inputTensor = window.tf.tensor2d([features], [1, features.length]);
      const output = modelRef.current.predict(inputTensor);
      const probs = output.dataSync();
      inputTensor.dispose();
      output.dispose();

      let maxIdx = 0;
      let maxProb = probs[0];
      for (let i = 1; i < probs.length; i++) {
        if (probs[i] > maxProb) {
          maxProb = probs[i];
          maxIdx = i;
        }
      }

      return {
        landmarks: result.landmarks,
        gestures: [[{
          categoryName: classesRef.current[maxIdx],
          score: maxProb,
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