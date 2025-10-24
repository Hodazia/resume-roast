import React, { useState, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FiCopy, FiDownload, FiCheck } from "react-icons/fi";

// const API_URL = "https://roast-resume-f8p9.onrender.com/resume/roast"; // Change if needed


const API_URL = "https://be-resume-roast.onrender.com/resume/roast"; // Change if needed

const INTENSITIES = [
  { value: "mild", label: "Mild Rant" },
  { value: "medium", label: "Medium Sarcasm" },
  { value: "spicy", label: "Spicy Burn" },
];

const PERSONAS = [
  { value: "hr", label: "Grumpy HR Manager" },
  { value: "tech", label: "Sarcastic Tech Recruiter" },
  { value: "ceo", label: "Deadpan CEO" },
];

const SECTIONS = [
  { value: "summary", label: "Summary" },
  { value: "experience", label: "Experience" },
  { value: "skills", label: "Skills" },
  { value: "education", label: "Education" },
  { value: "projects", label: "Projects" },
];

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [roast, setRoast] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [intensity, setIntensity] = useState(INTENSITIES[1].value);
  const [persona, setPersona] = useState(PERSONAS[0].value);
  const [sections, setSections] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const roastRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
    setRoast(null);
    setError(null);
  };

  const handleSectionChange = (section: string) => {
    setSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please upload a PDF resume.");
      return;
    }
    setLoading(true);
    setRoast(null);
    setError(null);

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("intensity", intensity);
    formData.append("persona", persona);
    formData.append("sections", JSON.stringify(sections));

    try {
      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (typeof response.data.roast === "string") {
        setRoast(response.data.roast);
      } else if (response.data.roast && typeof response.data.roast.content === "string") {
        setRoast(response.data.roast.content);
      } else {
        setRoast("No roast found.");
      }
      //setRoast(typeof response.data.roast === "string" ? response.data.roast : JSON.stringify(response.data.roast));
      setTimeout(() => {
        roastRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
          "Something went wrong. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (roast) {
      navigator.clipboard.writeText(roast);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const handleDownload = () => {
    if (roast) {
      const blob = new Blob([roast], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "roast.txt";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 flex flex-col items-center justify-center px-4 py-8">
      {/* Rich Burgundy Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, 
              rgba(220, 38, 38, 0.2) 0%, 
              rgba(220, 38, 38, 0.12) 25%, 
              rgba(220, 38, 38, 0.06) 35%, 
              transparent 50%
            )
          `,
          backgroundSize: "100% 100%",
        }}
      />
      
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold text-white mb-4 text-center drop-shadow-lg relative z-10"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80 }}
      >
        Roast My Resume
      </motion.h1>
      <motion.p
        className="text-lg md:text-2xl text-gray-300 mb-8 text-center max-w-2xl relative z-10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Upload your resume (PDF) and get a hilarious, AI-powered roast. Don't take it personally—take it as comedy!
      </motion.p>
      <form
        className="bg-stone-800/50 backdrop-blur-md rounded-xl p-8 shadow-2xl flex flex-col items-center w-full max-w-lg border border-stone-700/50 relative z-10"
        onSubmit={handleSubmit}
      >
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="mr-4 file:py-2 file:px-4 
          file:rounded-full file:border-0 file:text-sm 
          file:font-semibold file:bg-red-500 text-white hover:file:bg-red-600
            transition mb-4 w-full"
        />
        <div className="flex flex-col md:flex-row gap-4 w-full mb-4">
          <div className="flex-1">
            <label className="block text-gray-300 mb-1 font-semibold">Roast Intensity</label>
            <select
              value={intensity}
              onChange={e => setIntensity(e.target.value)}
              className="w-full rounded-lg px-3 py-2 bg-stone-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500 border border-stone-600"
            >
              {INTENSITIES.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-gray-300 mb-1 font-semibold">Roaster Persona</label>
            <select
              value={persona}
              onChange={e => setPersona(e.target.value)}
              className="w-full rounded-lg px-3 py-2 bg-stone-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500 border border-stone-600"
            >
              {PERSONAS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-full mb-4">
          <label className="block text-gray-300 mb-1 font-semibold">Targeted Roast Sections</label>
          <div className="flex flex-wrap gap-2">
            {SECTIONS.map(opt => (
              <label key={opt.value} className="flex items-center gap-1 text-gray-200 bg-stone-700 px-3 py-1 rounded-lg cursor-pointer select-none border border-stone-600 hover:border-red-500/50 transition-colors">
                <input
                  type="checkbox"
                  checked={sections.includes(opt.value)}
                  onChange={() => handleSectionChange(opt.value)}
                  className="accent-red-500"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>
        <button
          type="submit"
          disabled={loading || !file}
          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition disabled:opacity-50 hover:scale-105"
        >
          {loading ? "Roasting..." : "Roast Me!"}
        </button>
      </form>

      <div className="mt-8 w-full max-w-2xl relative z-10" ref={roastRef}>
        <AnimatePresence>
          {loading && (
            <motion.div
              className="flex flex-col items-center justify-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4"
                aria-label="Loading"
              />
              <span className="text-gray-300 text-lg">Roasting your resume...</span>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {roast && !loading && (
            <motion.div
              className="bg-stone-800/50 backdrop-blur-md rounded-xl p-6 mt-4 shadow-lg text-white text-lg whitespace-pre-line relative border border-stone-700/50"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span role="img" aria-label="fire" className="text-2xl mr-2">
                🔥
              </span>
              {roast}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={handleCopy}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition"
                  title="Copy to clipboard"
                >
                  {copied ? <FiCheck className="text-green-300" /> : <FiCopy />}
                </button>
                <button
                  onClick={handleDownload}
                  className="bg-stone-600 hover:bg-stone-700 text-white rounded-full p-2 transition"
                  title="Download roast"
                >
                  <FiDownload />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {error && !loading && (
            <motion.div
              className="bg-red-600/80 rounded-xl p-4 mt-4 shadow-lg text-white text-lg border border-red-500/30"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <footer className="mt-16 text-gray-400 text-sm text-center opacity-70 relative z-10">
        &copy; {new Date().getFullYear()} Roast My Resume. Made with <span className="text-red-500">♥</span> by ZIAUL
      </footer>
    </div>
  );
}

export default App;