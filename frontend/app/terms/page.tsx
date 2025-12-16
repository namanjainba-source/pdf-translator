import React from 'react';
import Link from 'next/link';

export default function Terms() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-100">
        
        <div className="bg-slate-900 text-white p-6 sm:p-10">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-blue-300 hover:text-white mb-6 transition-colors">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                Back to Translator
            </Link>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Terms of Service</h1>
            <p className="mt-2 text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="p-6 sm:p-10 space-y-8 leading-relaxed text-slate-600">
            <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">1. Acceptance of Terms</h2>
                <p>
                    By accessing and using <strong>DocTranslate</strong> ("the Service"), you agree to accept and comply with these Terms of Service. If you do not agree with any part of these terms, you must not use the Service.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">2. Description of Service</h2>
                <p>
                    DocTranslate provides an automated document translation service powered by artificial intelligence. We support various file formats including PDF, DOCX, and PPTX. While we strive for high accuracy, machine translation is not perfect and should not replace professional human translation for critical documents (legal, medical, etc.).
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">3. User Responsibilities</h2>
                <ul className="list-disc pl-5 space-y-2">
                    <li>You are responsible for the content of the documents you upload.</li>
                    <li>You must not upload files that contain malware, viruses, or illegal content.</li>
                    <li>You agree not to use the Service for any unlawful purpose.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">4. Disclaimer of Warranties</h2>
                <p>
                    The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We do not warrant that the translation will be error-free, accurate, or reliable. We disclaim all warranties, express or implied, including but not limited to implied warranties of merchantability and fitness for a particular purpose.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">5. Limitation of Liability</h2>
                <p>
                    In no event shall DocTranslate be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of or inability to use the Service.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">6. Changes to Terms</h2>
                <p>
                    We reserve the right to modify these terms at any time. We will notify users of any significant changes by updating the date at the top of this page. Continued use of the Service after changes constitutes acceptance of the new terms.
                </p>
            </section>

            <div className="pt-6 border-t border-slate-100">
                <p className="text-sm">
                    If you have any questions about these Terms, please contact us.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}
