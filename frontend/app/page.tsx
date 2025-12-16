"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Languages,
  Check,
  Download,
  RefreshCw,
} from "lucide-react";

import FileUpload from "../components/FileUpload";
import LanguageSelector from "../components/LanguageSelector";
import { translateDocument } from "../lib/api";
import { triggerDownload } from "../lib/download";

/* Ad Placeholder */
const AdSpace = ({ label }: { label: string }) => (
  <div className="w-full bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center py-8 text-slate-400">
    <span className="text-xs font-bold uppercase tracking-widest mb-2">
      Advertisement
    </span>
    <div>{label}</div>
  </div>
);

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [targetLang, setTargetLang] = useState("fr");
  const [status, setStatus] = useState<
    "idle" | "translating" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultFilename, setResultFilename] = useState<string | null>(null);

  const handleTranslate = async () => {
    if (!file) return;

    setStatus("translating");
    setError(null);

    try {
      const { blob, filename } = await translateDocument(file, targetLang);
      setResultBlob(blob);
      setResultFilename(filename);
      setStatus("success");
      triggerDownload(blob, filename);
    } catch (e: any) {
      setStatus("error");
      setError(e?.message || "Translation failed");
    }
  };

  const reset = () => {
    setFile(null);
    setStatus("idle");
    setError(null);
    setResultBlob(null);
    setResultFilename(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* NAVBAR */}
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <Languages size={20} />
          </div>
          <span className="font-bold text-xl">
            Doc<span className="text-blue-600">Translate</span>
          </span>
        </div>
      </nav>

      <main className="flex-grow max-w-5xl mx-auto px-6 py-14 w-full">
        <AdSpace label="Top Banner Ad" />

        <h1 className="text-4xl font-extrabold text-center mt-12 mb-6">
          Translate Documents Instantly
        </h1>
        <p className="text-center text-slate-600 mb-12">
          Upload your document and download the translated version in seconds.
        </p>

        <div className="bg-white rounded-3xl shadow-xl border p-10">
          {/* LANGUAGE BAR */}
          <div className="flex flex-col md:flex-row gap-4 items-center mb-10">
            <div className="w-full md:w-1/2 opacity-60">
              <div className="border rounded-xl px-4 py-3 bg-slate-100">
                Auto Detect
              </div>
            </div>

            <ArrowRight className="rotate-90 md:rotate-0" />

            <div className="w-full md:w-1/2">
              <LanguageSelector
                selectedCode={targetLang}
                onChange={setTargetLang}
                disabled={status === "translating"}
              />
            </div>
          </div>

          {/* STATES */}
          {status === "idle" && (
            <>
              <FileUpload onFileSelect={setFile} />

              {file && (
                <div className="mt-8 text-center">
                  <button
                    onClick={handleTranslate}
                    className="px-10 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition"
                  >
                    Translate Now
                  </button>
                </div>
              )}
            </>
          )}

          {status === "translating" && (
            <div className="text-center py-20">
              <RefreshCw className="mx-auto animate-spin text-blue-600" size={48} />
              <p className="mt-6 font-semibold">Translating…</p>
            </div>
          )}

          {status === "success" && (
            <div className="text-center py-20">
              <Check className="mx-auto text-green-600" size={48} />
              <p className="mt-4 font-semibold">Translation Complete</p>

              <div className="mt-6 flex justify-center gap-4">
                <button
                  onClick={() =>
                    resultBlob &&
                    resultFilename &&
                    triggerDownload(resultBlob, resultFilename)
                  }
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl flex items-center gap-2"
                >
                  <Download size={18} /> Download Again
                </button>

                <button
                  onClick={reset}
                  className="px-6 py-3 border rounded-xl"
                >
                  Translate Another
                </button>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="text-center py-20 text-red-600">
              <p className="font-bold mb-4">Error</p>
              <p>{error}</p>
              <button onClick={reset} className="mt-6 underline">
                Try Again
              </button>
            </div>
          )}
        </div>

        <AdSpace label="Bottom Ad" />
      </main>

      <footer className="border-t bg-white py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} DocTranslate
      </footer>
    </div>
  );
}
