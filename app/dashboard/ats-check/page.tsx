"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getUserResumes, getResumeById } from "@/app/actions/resumeActions";
import { analyzeResumeWithAI } from "@/app/actions/aiActions";
import { Sparkles, AlertTriangle, Lightbulb, TrendingUp, Loader2 } from "lucide-react";

export default function ATSCheckPage() {
  const searchParams = useSearchParams();
  const initialResumeId = searchParams.get("resumeId");

  const [resumes, setResumes] = useState<any[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState<string>(initialResumeId || "");
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadResumes() {
      setLoading(true);
      const res = await getUserResumes();
      if (res.success) {
        setResumes(res.data || []);
      }
      setLoading(false);
    }
    loadResumes();
  }, []);

  const handleAnalyze = async () => {
    if (!selectedResumeId) return;
    
    setAnalyzing(true);
    setError(null);
    setResult(null);

    // Fetch full resume data
    const res = await getResumeById(selectedResumeId);
    if (!res.success) {
      setError("Failed to fetch resume data.");
      setAnalyzing(false);
      return;
    }

    const aiRes = await analyzeResumeWithAI(res.data);
    if (aiRes.success) {
      setResult(aiRes.data);
    } else {
      setError(aiRes.error);
    }
    setAnalyzing(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-purple-600" />
          AI ATS Checker
        </h1>
        <p className="text-gray-500 mt-2">
          Select a resume to analyze against applicant tracking systems and get actionable feedback.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-8 flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Resume</label>
          <select 
            value={selectedResumeId}
            onChange={(e) => setSelectedResumeId(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:ring-black focus:border-black"
            disabled={loading}
          >
            <option value="">-- Choose a resume --</option>
            {resumes.map(r => (
              <option key={r.id} value={r.id}>{r.name} - {r.title}</option>
            ))}
          </select>
        </div>
        <button 
          onClick={handleAnalyze}
          disabled={!selectedResumeId || analyzing || loading}
          className="w-full sm:w-auto bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
        >
          {analyzing ? <><Loader2 className="w-5 h-5 animate-spin" /> Analyzing...</> : "Run Check"}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-8 flex items-start gap-3 border border-red-100">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Score Card */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm flex flex-col md:flex-row items-center gap-8">
            <div className="relative flex-shrink-0">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-100" />
                <circle 
                  cx="64" cy="64" r="56" 
                  stroke="currentColor" strokeWidth="12" fill="transparent" 
                  strokeDasharray="351.858" 
                  strokeDashoffset={351.858 - (351.858 * result.atsScore) / 100}
                  className={result.atsScore >= 80 ? "text-green-500" : result.atsScore >= 50 ? "text-amber-500" : "text-red-500"} 
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-3xl font-bold">{result.atsScore}</span>
                <span className="text-xs text-gray-500 font-medium">/ 100</span>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Overall Score</h2>
              <p className="text-gray-600 leading-relaxed">{result.summary}</p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Detailed Feedback</h3>
            
            {result.feedback && result.feedback.map((item: { weakness: string, improvement: string }, i: number) => (
              <div key={i} className="grid md:grid-cols-2 gap-4">
                {/* Weak Point */}
                <div className="bg-red-50/50 rounded-xl p-5 border border-red-100 flex flex-col h-full">
                  <h4 className="text-sm font-bold text-red-900 flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    Original Weakness
                  </h4>
                  <p className="text-red-800/90 text-sm leading-relaxed whitespace-pre-wrap italic flex-1">
                    "{item.weakness}"
                  </p>
                </div>

                {/* Improvement */}
                <div className="bg-green-50/50 rounded-xl p-5 border border-green-100 flex flex-col h-full relative">
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-gray-200 rounded-full hidden md:flex items-center justify-center z-10 shadow-sm text-gray-400">
                    <TrendingUp className="w-3 h-3" />
                  </div>
                  <h4 className="text-sm font-bold text-green-900 flex items-center gap-2 mb-3">
                    <Lightbulb className="w-4 h-4 text-green-500" />
                    Enhanced Version
                  </h4>
                  <p className="text-green-800/90 text-sm leading-relaxed whitespace-pre-wrap font-medium flex-1">
                    {item.improvement}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
