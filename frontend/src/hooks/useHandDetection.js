import { useEffect, useRef, useState } from "react";
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import * as tflite from "@tensorflow/tfjs-tflite";

export default function useHandDetection() {
  const handLandmarkerRef = useRef(null);
  const tfliteModelRef = useRef(null);
  const classesRef = useRef([]);
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState("Loading hand detection");

  useEffect(() => {
    let mounted = true;

    async function loadAll() {
      try {
        setStatus("Loading hand detection");
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

        setStatus("Loading ASL classes");
        const classesRes = await fetch("/models/asl_classes.json");
        const classes = await classesRes.json();
        classesRef.current = classes;

        setStatus("Loading ASL model");
        tflite.setWasmPath("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-tflite/dist/");
        const model = await tflite.loadTFLiteModel("/models/asl_model.tflite");

        if (!mounted) return;
        tfliteModelRef.current = model;

        setStatus("Ready");
        setReady(true);
        console.log("Loaded ASL model with", classes.length, "classes");
      } catch (err) {
        console.error("Model load error:", err);
        setStatus("Model failed to load");
      }
    }

    loadAll();
    return () => {
      mounted = false;
    };
  }, []);

  const extractFeatures = (landmarks) => {
    const wrist = landmarks[0];
    const features = [];
    for (const lm of landmarks) {
      features.push(lm.x - wrist.x, lm.y - wrist.y, lm.z - wrist.z);
    }
    return features;
  };

  const detect = (video) => {
    if (!handLandmarkerRef.current || !video) return null;

    const result = handLandmarkerRef.current.detectForVideo(video, performance.now());

    if (!result.landmarks || result.landmarks.length === 0) {
      return { landmarks: [], gestures: [] };
    }

    if (!tfliteModelRef.current) return result;

    try {
      const features = extractFeatures(result.landmarks[0]);
      const inputTensor = window.tf.tensor2d([features], [1, features.length]);
      const output = tfliteModelRef.current.predict(inputTensor);
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

      const predictedClass = classesRef.current[maxIdx];

      return {
        landmarks: result.landmarks,
        gestures: [[{
          categoryName: predictedClass,
          score: maxProb,
        }]],
      };
    } catch (err) {
      console.error("Prediction error:", err);
      return result;
    }
  };

  return { ready, detect, status };
}