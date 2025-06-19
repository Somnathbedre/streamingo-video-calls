import { useState } from "react";
import toast from "react-hot-toast";

const AiLanguageHelper = () => {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [targetLang, setTargetLang] = useState("hi");

  const handleAskAI = async () => {
    if (!text.trim()) return toast.error("Enter something to translate.");

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/translate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, targetLang }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setResponse(data.translation || "No response received.");
    } catch (e) {
      console.error("AI Error:", e);
      toast.error("Translation failed.");
      setResponse("Translation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 p-4 bg-base-200 rounded shadow">
      <h3 className="text-lg font-semibold mb-2">💬 Language Learning Assistant (AI)</h3>

      <textarea
        className="textarea textarea-bordered w-full"
        placeholder="Enter text to translate..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="mt-2 flex items-center gap-2">
        <label htmlFor="lang" className="text-sm font-medium">
          Translate to:
        </label>
        <select
          id="lang"
          className="select select-bordered"
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
        >
          <option value="hi">Hindi</option>
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
          <option value="de">German</option>
          <option value="ta">Tamil</option>
          <option value="te">Telugu</option>
        </select>
      </div>

      <button
        className="btn btn-primary mt-3"
        onClick={handleAskAI}
        disabled={loading}
      >
        {loading ? "Translating..." : "Ask AI"}
      </button>

      {response && (
        <div className="mt-4 p-3 bg-base-100 rounded border border-base-300">
          <strong>AI Response:</strong>
          <p className="mt-1">{response}</p>
        </div>
      )}
    </div>
  );
};

export default AiLanguageHelper;
