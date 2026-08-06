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

const LETTER_HOLD_FRAMES = 15;
const WORD_PAUSE_MS = 1500;

export function SignProvider({ children }) {
  const [currentSign, setCurrentSign] = useState("");
  const [currentWord, setCurrentWord] = useState("");
  const [sentence, setSentence] = useState("");
  const [confidence, setConfidence] = useState(0);

  const signBuffer = useRef([]);
  const lastSignTime = useRef(Date.now());
  const lastWordTime = useRef(Date.now());
  const wordPauseTimer = useRef(null);

  const pushSign = (sign, score) => {
    if (!sign || sign === "None" || sign === "no_gesture") return;

    setCurrentSign(sign);
    setConfidence(Math.round(score * 100));

    signBuffer.current.push(sign);
    if (signBuffer.current.length > LETTER_HOLD_FRAMES) {
      signBuffer.current.shift();
    }

    const counts = signBuffer.current.reduce((acc, s) => {
      acc[s] = (acc[s] || 0) + 1;
      return acc;
    }, {});

    const dominant = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    if (!dominant || dominant[1] < LETTER_HOLD_FRAMES * 0.6) return;

    const dominantSign = dominant[0];
    const now = Date.now();

    if (now - lastSignTime.current < 800) return;
    lastSignTime.current = now;

    if (dominantSign === "space") {
      finalizeWord();
    } else {
      setCurrentWord((prev) => prev + dominantSign);
      lastWordTime.current = Date.now();

      if (wordPauseTimer.current) clearTimeout(wordPauseTimer.current);
      wordPauseTimer.current = setTimeout(() => {
        finalizeWord();
      }, WORD_PAUSE_MS);
    }
  };

  const finalizeWord = () => {
    setCurrentWord((prev) => {
      if (prev.trim()) {
        setSentence((s) => (s ? s + " " + prev : prev));
      }
      return "";
    });
  };

  const clearSentence = () => {
    setCurrentSign("");
    setCurrentWord("");
    setSentence("");
    setConfidence(0);
    signBuffer.current = [];
  };

  const removeLastWord = () => {
    setSentence((prev) => {
      const words = prev.trim().split(" ");
      words.pop();
      return words.join(" ");
    });
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