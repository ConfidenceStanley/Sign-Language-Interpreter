import { useEffect, useState } from "react";
import api from "./services/api";

function App() {
  const [status, setStatus] = useState("");

  useEffect(() => {
    api.get("/")
      .then(res => setStatus(res.data.status))
      .catch(() => setStatus("Backend not reachable"));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">
        Sign Language Interpreter 🚀
      </h1>
      <p>{status}</p>
    </div>
  );
}

export default App;