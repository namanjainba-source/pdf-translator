"use client";
import React, { useState } from 'react';
import { Loader2, ArrowRight, Languages, Check, Download, RefreshCw } from 'lucide-react';
import FileUpload from '@/components/FileUpload';
import LanguageSelector from '@/components/LanguageSelector';
import { translateDocument } from '@/lib/api';
import { triggerDownload } from '@/lib/download';

// AdSense Placeholder Component
const AdSpace = ({ label, className }: { label: string, className?: string }) => (
  <div className={`w-full bg-slate-100/80 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-400 py-8 ${className}`}>
     <span className="text-xs font-bold uppercase tracking-widest mb-2 text-slate-500">Advertisement</span>
     <div className="font-medium text-slate-600">{label}</div>
     <div className="text-xs mt-1 opacity-75">Google AdSense Space</div>
  </div>
);

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [sourceLang, setSourceLang] = useState('auto'); // Not used in API yet, but good for UI
  const [targetLang, setTargetLang] = useState('fra_Latn');
  const [status, setStatus] = useState<'idle' | 'translating' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  
  // Optional: Check if we are in mock mode for UI feedback (not strictly necessary as API handles it)
  const isMock = process.env.NEXT_PUBLIC_USE_MOCK_BACKEND === 'true';

  const handleTranslate = async () => {
    if (!file) return;
    setStatus('translating'); 
    setError(null);
    
    try {
      const { blob, filename } = await translateDocument(file, targetLang);
      setStatus('success');
      // Automatically trigger download on success, or let user click the button
      triggerDownload(blob, filename);
    } catch (e: any) {
      setStatus('error'); 
      setError(e.message);
    }
  };

  const handleReset = () => {
    setFile(null);
    setStatus('idle');
    setError(null);
  };

  const swapLanguages = () => {
      // Logic to swap languages if source was selectable
      // For now, just a visual placeholder action or flip
      const temp = sourceLang;
      setSourceLang(targetLang);
      setTargetLang(temp);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 flex flex-col">
      
      {/* Dev Mode Banner */}
      {isMock && (
        <div className="bg-amber-100 text-amber-800 text-center text-xs font-bold py-2 px-4 shadow-sm">
            DEV MODE: Using Mock Backend (No files uploaded)
        </div>
      )}

      {/* Navbar */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg text-white shadow-md shadow-blue-200">
              <Languages size={20} />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">DocTrans<span className="text-blue-600">late</span></span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-blue-600 transition-colors">History</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#" className="hover:text-blue-600 transition-colors">API</a>
            <button className="px-5 py-2 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all hover:shadow-lg text-sm font-semibold">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8 w-full">
        
        {/* Ad Placement 1: Top Leaderboard (High Visibility) */}
        <AdSpace label="Top Leaderboard (728x90)" className="mb-12 hidden md:flex" />

        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
            Translate documents <span className="text-blue-600">instantly.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Preserve layout, formatting, and fonts. Supports PDF, DOCX, PPTX, and TXT. 
            Powered by advanced AI models.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden relative transition-all hover:shadow-2xl duration-500">
          
          {/* Decorative gradient line */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

          {/* Language Selector Bar */}
          <div className="p-4 md:p-6 bg-slate-50/50 border-b border-slate-100 flex flex-col md:flex-row items-center justify-center gap-4">
             {/* Note: Source language is often auto-detected, so we might just show "Auto Detect" or a disabled dropdown */}
             <div className="w-full md:w-64 opacity-60 pointer-events-none">
                 <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 ml-1">Original Language</label>
                 <div className="w-full px-4 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium">
                     Auto Detect
                 </div>
             </div>

             <button 
                className="mt-6 p-2 rounded-full hover:bg-white hover:shadow-md border border-transparent hover:border-slate-200 text-slate-400 hover:text-blue-600 transition-all duration-200"
                title="Swap Languages (Auto-detect active)"
             >
                <ArrowRight size={20} className="md:hidden rotate-90" />
                <ArrowRight size={20} className="hidden md:block" />
             </button>

             <div className="w-full md:w-64">
                <LanguageSelector 
                    selectedCode={targetLang} 
                    onChange={setTargetLang} 
                    disabled={status === 'translating'} 
                />
             </div>
          </div>

          {/* Interaction Area */}
          <div className="p-8 md:p-12 min-h-[400px] flex flex-col items-center justify-center bg-white">
            
            {status === 'idle' && (
               <div className="w-full max-w-2xl animate-fade-in">
                  <FileUpload onFileSelect={setFile} disabled={false} />
                  
                  {file && (
                      <div className="mt-8 flex justify-center animate-fade-in-up">
                        <button 
                            onClick={handleTranslate} 
                            className="w-full sm:w-auto px-10 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2 text-lg group"
                        >
                            <span>Translate Now</span>
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                  )}
               </div>
            )}

            {status === 'translating' && (
               <div className="w-full max-w-lg text-center animate-fade-in">
                  <div className="mb-8 relative inline-block">
                     <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center relative">
                        <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>
                        <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
                        <RefreshCw size={32} className="text-blue-600 animate-pulse" />
                     </div>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Translating...</h3>
                  <p className="text-slate-500 mb-8 max-w-md mx-auto">
                    Please wait while we process your document. This usually takes a few seconds, but larger files might take longer.
                  </p>

                  <div className="h-2 w-64 mx-auto bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 w-1/2 animate-progress rounded-full"></div>
                  </div>
               </div>
            )}

            {status === 'success' && (
              <div className="w-full max-w-xl bg-green-50/50 border border-green-100 rounded-2xl p-8 flex flex-col items-center text-center animate-fade-in-up">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600 shadow-sm ring-4 ring-green-50">
                  <Check size={40} strokeWidth={3} />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Translation Complete!</h3>
                <p className="text-slate-600 mb-8 max-w-sm">
                  Your document <strong>{file?.name}</strong> has been successfully translated.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <button 
                    onClick={() => file && triggerDownload(new Blob([]), `translated_${file.name}`)} // Re-trigger if needed, usually auto-triggers
                    className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
                  >
                    <Download size={20} />
                    Download Again
                  </button>
                  <button 
                    onClick={handleReset}
                    className="px-8 py-4 bg-white text-slate-700 font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                  >
                    Translate Another
                  </button>
                </div>
              </div>
            )}

            {status === 'error' && (
                <div className="w-full max-w-lg bg-red-50 border border-red-100 rounded-2xl p-8 flex flex-col items-center text-center animate-fade-in">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 text-red-600">
                        <RefreshCw size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-red-700 mb-2">Translation Failed</h3>
                    <p className="text-red-600 mb-6">{error || "An unknown error occurred."}</p>
                    <button 
                        onClick={() => setStatus('idle')}
                        className="px-6 py-3 bg-white border border-red-200 text-red-700 font-semibold rounded-xl hover:bg-red-50 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            )}

          </div>
        </div>

        {/* Ad Placement 2: Mid-Content (Between Tool and Content) */}
        <AdSpace label="Responsive Display Ad" className="mt-16" />

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
             <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
               <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
             </div>
             <h3 className="text-xl font-bold text-slate-800 mb-3">Secure & Private</h3>
             <p className="text-slate-500 leading-relaxed">Files are transferred over encrypted SSL and automatically deleted from our servers after 1 hour.</p>
           </div>
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
             <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-6">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
             </div>
             <h3 className="text-xl font-bold text-slate-800 mb-3">Lightning Fast</h3>
             <p className="text-slate-500 leading-relaxed">Our advanced neural networks process documents in seconds, maintaining perfect formatting.</p>
           </div>
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
             <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-6">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
             </div>
             <h3 className="text-xl font-bold text-slate-800 mb-3">Format Preservation</h3>
             <p className="text-slate-500 leading-relaxed">Tables, images, charts, and fonts stay exactly where they belong in the translated output.</p>
           </div>
        </div>

      </main>

      <footer className="bg-white border-t border-slate-200 mt-20 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500 text-sm">
              <p className="mb-4">&copy; {new Date().getFullYear()} DocTranslate. All rights reserved.</p>
              <div className="flex justify-center gap-6">
                  <a href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
                  <a href="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</a>
                  <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
              </div>
          </div>
      </footer>
    </div>
  );
}
