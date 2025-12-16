import React from 'react';
import Link from 'next/link';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-100">
        
        <div className="bg-slate-900 text-white p-6 sm:p-10">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-blue-300 hover:text-white mb-6 transition-colors">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                Back to Translator
            </Link>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
            <p className="mt-2 text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="p-6 sm:p-10 space-y-8 leading-relaxed text-slate-600">
            <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">1. Information Collection</h2>
                <p>
                    When you use <strong>DocTranslate</strong>, we collect information that you voluntarily provide to us, specifically the documents you upload for translation. We may also collect anonymous usage data (such as browser type, time spent on site) to improve our service.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">2. Document Security & Retention</h2>
                <p>
                    We take the security of your documents seriously. 
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                    <li><strong>Encryption:</strong> All file transfers are encrypted using SSL/TLS technology.</li>
                    <li><strong>Processing:</strong> Your files are processed automatically by our translation servers.</li>
                    <li><strong>Deletion:</strong> To ensure your privacy, uploaded files and their translated versions are <strong>automatically permanently deleted from our servers 1 hour after processing</strong>. We do not store your documents for long-term use.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">3. Use of Information</h2>
                <p>
                    The documents you upload are used solely for the purpose of providing the translation service you requested. We do not use the content of your private documents to train our public models or for any marketing purposes.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">4. Cookies</h2>
                <p>
                    We use cookies to enhance your experience, such as remembering your preferred language settings. You can choose to disable cookies through your browser settings, though this may affect some functionality of the site.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">5. Third-Party Services</h2>
                <p>
                    We may use trusted third-party cloud providers (like Google Cloud or AWS) to host our infrastructure. These providers adhere to strict security standards and do not have access to your document contents except as necessary to provide the computing resources.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">6. Contact Us</h2>
                <p>
                    If you have any questions about this Privacy Policy, please contact us at privacy@doctranslate.com.
                </p>
            </section>

            <div className="pt-6 border-t border-slate-100">
                <p className="text-sm">
                    By using our Service, you consent to our Privacy Policy.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}
