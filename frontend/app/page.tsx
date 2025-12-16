"use client";
import React, { useState } from 'react';
import { Loader2, ArrowRight, Languages } from 'lucide-react';
import FileUpload from '@/components/FileUpload';
import LanguageSelector from '@/components/LanguageSelector';
import { translateDocument } from '@/lib/api';
import { triggerDownload } from '@/lib/download';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [targetLang, setTargetLang] = useState('fra_Latn');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState<string | null>(null);
  
  const isMock = process.env.NEXT_PUBLIC_USE_MOCK_BACKEND === 'true';

  const handleTranslate = async () => {
    if (!file) return;
    setStatus('translating'); setError(null);
    try {
      const { blob, filename } = await translateDocument(file, targetLang);
      setStatus('success');
      triggerDownload(blob, filename);
    } catch (e: any) {
      setStatus('error'); setError(e.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {isMock && <div className="bg-amber-100 text-center text-xs font-bold py-2">DEV MODE - MOCK BACKEND</div>}
      <header className="bg-white border-b p-4 flex items-center justify-center gap-2">
         <Languages className="text-blue-600"/> <h1 className="font-bold">Document Translator</h1>
      </header>
      <main className="max-w-3xl mx-auto p-6 py-12">
        <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Translate documents <span className="text-blue-600">instantly.</span></h2>
            <p className="text-slate-600">Upload PDF/DOCX. 100+ Languages. Secure.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl border overflow-hidden p-8 space-y-8">
            <FileUpload onFileSelect={setFile} disabled={status === 'translating'} />
            {file && <LanguageSelector selectedCode={targetLang} onChange={setTargetLang} disabled={status === 'translating'} />}
            {file && status !== 'success' && (
                <button onClick={handleTranslate} disabled={status === 'translating'} className="w-full bg-blue-600 text-white p-3 rounded-xl font-bold flex justify-center items-center gap-2">
                    {status === 'translating' ? <Loader2 className="animate-spin"/> : <>Translate <ArrowRight/></>}
                </button>
            )}
            {status === 'error' && <div className="bg-red-50 p-4 rounded text-red-700">{error}</div>}
            {status === 'success' && <div className="bg-green-50 p-8 text-center rounded text-green-700 font-bold">Download Started!</div>}
        </div>
      </main>
    </div>
  );
}
