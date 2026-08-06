import { createContext, useContext, useRef, useState } from "react";

const SignContext = createContext({
  currentSign: "",
  currentWord: "",
  sentence: "",
  confidence: 0,
  pushSign: () => {},
  clearSentence: () => {},
  removeLastWord: () => {},
  finalizeWord: () => {},
});

const GESTURE_MAP = {
  "Thumb_Up": "THUMB UP",
  "Thumb_Down": "THUMB DOWN",
  "Open_Palm": "OPEN PALM",
  "Closed_Fist": "CLOSED FIST",
  "Victory": "VICTORY",
  "Pointing_Up": "POINTING UP",
  "ILoveYou": "I LOVE YOU",
};

const IGNORED = ["None", "no_gesture", "", null, undefined];

const HOLD_FRAMES = 20;
const SIGN_COOLDOWN_MS = 1500;

export function SignProvider({ children }) {
  const [currentSign, setCurrentSign] = useState("");
  const [currentWord, setCurrentWord] = useState("");
  const [sentence, setSentence] = useState("");
  const [confidence, setConfidence] = useState(0);

  const signBuffer = useRef([]);
  const lastConfirmedSign = useRef("");
  const lastSignTime = useRef(0);

  const pushSign = (rawSign, score) => {
    if (IGNORED.includes(rawSign)) {
      setCurrentSign("");
      setConfidence(0);
      return;
    }

    const mappedSign = GESTURE_MAP[rawSign] || rawSign.replace(/_/g, " ");
    setCurrentSign(mappedSign);
    setConfidence(Math.round((score || 0) * 100));

    signBuffer.current.push(mappedSign);
    if (signBuffer.current.length > HOLD_FRAMES) {
      signBuffer.current.shift();
    }

    const counts = signBuffer.current.reduce((acc, s) => {
      acc[s] = (acc[s] || 0) + 1;
      return acc;
    }, {});

    const dominant = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    if (!dominant || dominant[1] < HOLD_FRAMES * 0.65) return;

    const dominantSign = dominant[0];
    const now = Date.now();

    if (
      dominantSign === lastConfirmedSign.current ||
      now - lastSignTime.current < SIGN_COOLDOWN_MS
    ) return;

    lastConfirmedSign.current = dominantSign;
    lastSignTime.current = now;

    setSentence((prev) => {
      const parts = prev ? prev.split(" ") : [];
      parts.push(dominantSign);
      return parts.join(" ");
    });
  };

  const clearSentence = () => {
    setCurrentSign("");
    setCurrentWord("");
    setSentence("");
    setConfidence(0);
    signBuffer.current = [];
    lastConfirmedSign.current = "";
    lastSignTime.current = 0;
  };

  const removeLastWord = () => {
    setSentence((prev) => {
      const parts = prev.trim().split(" ");
      parts.pop();
      return parts.join(" ");
    });
  };

  const finalizeWord = () => {
    if (currentWord.trim()) {
      setSentence((prev) => (prev ? prev + " " + currentWord : currentWord));
      setCurrentWord("");
    }
  };

  return (
    <SignContext.Provider
      value={{
        currentSign,
        currentWord,
        sentence,
        confidence,
        pushSign,
        clearSentence,
        removeLastWord,
        finalizeWord,
      }}
    >
      {children}
    </SignContext.Provider>
  );
}

export function useSign() {
  return useContext(SignContext);
}