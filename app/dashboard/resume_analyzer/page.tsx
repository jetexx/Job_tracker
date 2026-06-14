"use client";

import { useState } from "react";

export default function ResumeAnalyzerPage() {
  const [file, setFile] =
    useState<File | null>(null);

  const [analysis, setAnalysis] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function analyzeResume() {
    if (!file) {
      alert("Please upload a PDF resume");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("resume", file);

      const res = await fetch(
        "/api/resume-analyzer",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || "Analysis failed"
        );
      }

      setAnalysis(data.analysis);
    } catch (error: any) {
      console.error(error);

      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Resume Analyzer
      </h1>

      <div className="space-y-4">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setFile(
              e.target.files?.[0] || null
            )
          }
        />

        <button
          onClick={analyzeResume}
          disabled={loading}
          className="bg-black text-white px-5 py-2 rounded"
        >
          {loading
            ? "Analyzing..."
            : "Analyze Resume"}
        </button>
      </div>

      {analysis && (
        <div className="mt-8 border rounded p-6">
          <h2 className="text-xl font-semibold mb-4">
            Analysis Result
          </h2>

          <pre className="whitespace-pre-wrap">
            {analysis}
          </pre>
        </div>
      )}
    </div>
  );
}